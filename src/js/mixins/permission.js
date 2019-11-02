import { getItem } from 'common/storage';
import { AUTH_CONTROL } from 'common/consts'

export default {
  methods: {
    $hasPermission(authName) {
      if (!AUTH_CONTROL) {
        return true;
      }

      const needAuth = this.$route.meta.auth;
      if (needAuth !== undefined && needAuth !== true) {
        return true;
      }

      let authList = this.$store.state.user.authList.join(',')
      if (!authList) {
        authList = getItem('authList');
      }
      authList = authList.split(',');
      const spt = '--';
      const isNotMenu = authName.includes(spt);
      if (isNotMenu) {
        return authList.includes(authName);
      }
      const pre = authName.split(spt)[0];
      return authList.includes(authName) && authList.includes(pre);
    },
  },
};
