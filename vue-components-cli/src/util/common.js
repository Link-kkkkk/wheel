import store from './../store/store'
import router from './../router/index'
const star = r => require.ensure([], () => r(require("../pages/star.vue")));
const error = r => require.ensure([], () => r(require("../pages/error.vue")));

function loadingRouter() {
  var _this = this;
  var routerSheet = [];
  var userIdentity = "";
  var route = [];
  var storeSheet = store.state.routerSheet;
  
  store.dispatch("RouterLoaded", routerSheet);

  for (let i = 0; i < storeSheet.length; i++) {
    changeRoute(storeSheet[i].name);
    routerSheet.push(storeSheet[i].name);
  }
  store.dispatch("SaveRouter", routerSheet);

  function changeRoute(routeName) {
    route = [
      {
        path: "/" + routeName,
        component: star,
        name: routeName
      }
    ];
    router.addRoutes(route);
  }
}

var com = {
  loadingRouter
}

export default com;
