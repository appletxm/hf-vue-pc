const detault = {
  userInfo: {},
  announcementList: [],
  currentModule: 'Home',
  navigatorList: [],
  appPrefix: ''
}
export const setInitialStates = (initialStates) => {
  return Object.assign(detault, initialStates)
}
