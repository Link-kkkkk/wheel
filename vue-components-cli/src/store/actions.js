const RouterLoad = ({ commit }) => {
  commit('loadRouter')
}

const UserLogin = ({ commit }) => {
  commit('userLogin')
}

const UserLogout = ({ commit }) => {
  commit('userLogout')
}

const SaveRouter = ({ commit }, newSheet) => {
  commit('saveRouter', newSheet)
}

const Test = ({ commit }) => {
  commit('test')
}

export {
  RouterLoad,
  UserLogin,
  UserLogout,
  SaveRouter,

  Test
}