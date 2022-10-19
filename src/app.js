// import { mapActions } from "vuex";
import Vue from "vue"
import router from "@/router/index";
import menu from "./views/menu";

const MyHeader = () => import(/* webpackChunkName: "MyHeader" */  '@/components/MyHeader.vue');
const Footer = () => import(/* webpackChunkName: "Footer" */  '@/components/Footer.vue');

function loadView(path, view) {
	if(view === undefined)
		return null
	else return () => import(/* webpackChunkName: "view-[request]" */ `@/${path}/${view}.vue`)
}

export default {
  name: "App",
  components:{
    MyHeader, Footer
  },
  methods: {
    makeRouteView() {
      let menuData = JSON.parse(JSON.stringify(menu));
      let menuList = menuData.menu;

      let menuLength = menuList?.length;
      let records = [];

      for(let i = 0; i < menuLength; i++) {
				let el = menuList[i];
				
				let menuItem = {
					fullpath: el.url,
					path: el.url,
					name: el.menuId,
          menuid: el.menuId,
					component: loadView(el.pagePath, el.componentName),
				}

				records.push(menuItem);
			}

      // TODO 작업 추가

      // router 추가
      Vue.prototype._routelist = records;
      records.forEach(e => {
        router.addRoute(e);
      })
    },
  },
  created() {
    this.makeRouteView();
  },
}