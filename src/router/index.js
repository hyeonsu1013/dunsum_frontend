import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
    // NavigationDuplicated Err처리 : 프론트에서 같은 페이지로 router.push('path')를 하게될때 발생
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};

const routes = [];

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
