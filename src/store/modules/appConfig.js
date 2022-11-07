
const home = {
  state: {
    appName: '',
  },
  mutations: {
    SETAPPCONFIG: (state, appConfig) => {
      for (const key in appConfig) {
        state[key] = appConfig[key]
      }
    },
  },
  actions: {
    setAppConfig({ commit }, appConfig = {}) {
      commit('SETAPPCONFIG', appConfig);
    },
  },
};

export default home;
