const envCfg = require('env.cfg')
const RF_EXPRESS = envCfg.rfExpressApi + '/rf_express'
const RF_KDN = '/kdn'
// const RF_HTTP = envCfg.rfHttpApi + envCfg.rfHttpApiPrefix

export default {
  getDefaultAddress: RF_EXPRESS + '/userAddressDb/getDefaultAddress',
  getAddress: RF_EXPRESS + '/userAddressDb/get',
  getPriceEstimate: RF_EXPRESS + '/order/priceEstimate',
  commitOrder: RF_EXPRESS + '/order/commit',
  getAnnouncement: RF_EXPRESS + '/announcement/get',
  getListSonArea: RF_EXPRESS + '/area/getProvince',
  addAddress: RF_EXPRESS + '/userAddressDb/add',
  modifyAddress: RF_EXPRESS + '/userAddressDb/modify',
  deleteAddress: RF_EXPRESS + '/userAddressDb/delete',
  getOrderList: RF_EXPRESS + '/userOrders/list',
  getOrderLogisticInfo: RF_KDN + '/Ebusiness/EbusinessOrderHandle.aspx',
  getUserAddress: RF_EXPRESS + '/userAddressDb/get',
  setDefaultAddress: RF_EXPRESS + '/userAddressDb/setDefaultAddress',
  getServerTime: RF_EXPRESS + '/order/getDate',
  userLogin: RF_EXPRESS + '/account/login',
  getCurrentUserInfo: RF_EXPRESS + '/user/getCurrentUserInfo',
  mobileExist: RF_EXPRESS + '/account/mobileExist',
  getCode: RF_EXPRESS + '/verify/sms/send',
  userRegister: RF_EXPRESS + '/account/register',
  resetPassword: RF_EXPRESS + '/account/resetPassword',
  cancelOrder: RF_EXPRESS + '/order/getOrder/cancel'
}
