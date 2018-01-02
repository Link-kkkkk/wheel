import Lockr from "lockr";

const loadRouter = (state) => {
  state.isload = true
}

const userLogin = (state) => {
  state.login = true
  Lockr.set('login', 'true');
}

const userLogout = (state) => {
  state.login = false
  Lockr.set('login', 'false');
}

const saveRouter = (state, newSheet) => {
  state.userRouterSheet = newSheet
}

const test = (state) => {
  console.log('store test clear!')
}

const mutations = {
  loadRouter
}

export {
  loadRouter,
  userLogin,
  userLogout,
  saveRouter,

  test
}