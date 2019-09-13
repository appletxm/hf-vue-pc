const detault = {
  userInfo: {},
  announcementList: [],
  currentModule: 'Home',
  navigatorList: [],
  appPrefix: '',
  needShowLoginPop: false
}
export const setInitialStates = (initialStates) => {
  return Object.assign(detault, initialStates)
}
