import Vue from "vue"
import router from "@/router/index";
import menu from "./views/menu";
import {overrideUserAgentUsingClientHints} from "@/utils/uach-retrofill";


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
  data() {
    return {
      // UserAgent-ClientHints Data
      ovUserAgnet : "",
      userAgentHints : ["architecture","bitness","model","platformVersion","uaFullVersion","wow64"],
      isMobl : false,
    }
  },
  methods: {
    // UserAgent-ClientHints
    setUserAgnet() {
      let _this = this;
      overrideUserAgentUsingClientHints(this.userAgentHints).then(() => {
          _this.ovUserAgnet = navigator.userAgent;

          // 위 데이터 활용하여 모바일 접속 판별
          let isMobile1 = navigator.userAgentData?.mobile;
          let isMobile2 = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          let isMobile3 = /Mobi/i.test(window.navigator.userAgent);

          _this.isMobl = isMobile1 || isMobile2 || isMobile3;
      });
    },

    // Menu 셋팅
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
    this.setUserAgnet();
    this.makeRouteView();
  },
}