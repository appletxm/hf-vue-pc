// import router from '@/router';
import Vue from 'vue';
import * as types from '../mutation-types';

const tabs = {
  state: {
    // 是否显示
    isTabsShow: true,
    // 当前选中的tab序号
    curTabIndex: 0,
    tabList: [],
    refreshKeys: {},
  },
  getters: {
    // tab数据
    tabList(state) {
      return state.tabList;
    },
    // 当前选中的tab序号
    curTabIndex(state) {
      return state.curTabIndex;
    },
    // tab key数据
    refreshKeys(state) {
      return state.refreshKeys;
    },
    // tabs是否显示
    isTabsShow(state) {
      return state.isTabsShow;
    },
  },
  mutations: {
    // 设置tab key 对象
    [types.SET_REFRESH_KEYS](state, keys) {
      state.refreshKeys = keys;
    },
    // 设置tab key单个属性值
    [types.SET_REFRESH_KEY](state, keyObj) {
      const key = keyObj.key;
      const value = keyObj.value;
      if (key in state.refreshKeys) {
        state.refreshKeys[key] = value;
      } else {
        Vue.set(state.refreshKeys, keyObj.key, keyObj.value);
      }
    },
    // 新加tab项
    [types.ADD_TAB](state, newTabItem) {
      // 如果没显示，则只放当前这一个
      if (!state.isTabsShow) {
        state.tabList = [newTabItem];
        return;
      }
      const index = state.tabList.findIndex((item) => item.path === newTabItem.path);
      state.curTabIndex = index;
      // 不存在这样的项
      if (index === -1) {
        state.tabList.push(newTabItem);
        state.curTabIndex = state.tabList.length - 1;
        // 设置tab key
        this.commit(types.SET_REFRESH_KEY, {
          key: newTabItem.path,
          value: '',
        });
      }
    },
    // 删除tab项
    [types.DEL_TAB](state, delTab) {
      const delTabPath = delTab.path;
      // 只有一个时且是首页时，不删
      if ((delTabPath === '/' || delTabPath === '/admin') && state.tabList.length === 1) {
        return;
      }
      const delTabIndex = state.tabList.findIndex((item) => item.path === delTabPath);
      state.tabList.splice(delTabIndex, 1);
      // 删除tab key
      delete state.refreshKeys[delTabPath];
    },
    // 删除其他tab项
    [types.DEL_OTHER_TABS](state, notDelTab) {
      const notDelTabPath = notDelTab.path;
      const notDelTabIndex = state.tabList.findIndex((item) => item.path === notDelTabPath);
      state.tabList = [state.tabList[notDelTabIndex]];
      // 设置tab key
      this.commit(types.SET_REFRESH_KEY, {
        key: notDelTabPath,
        value: '',
      });
    },
    // 删除右侧其他tab项
    [types.DEL_RIGHT_TABS](state, curTab) {
      const curTabIndex = state.tabList.findIndex((item) => item.path === curTab.path);
      const delTabs = [...state.tabList.slice(curTabIndex)];
      state.tabList = [...state.tabList.slice(0, curTabIndex + 1)];
      // 设置tab key
      for (let i = 0, len = delTabs.length; i < len; i += 1) {
        delete state.refreshKeys[delTabs[i].path];
      }
      // state.tabList.splice(curTabIndex, state.tabList.length - 1 - curTabIndex);
    },
    // 删除所有tab项
    [types.DEL_ALL_TABS](state) {
      // 只有一个时且是首页时，不删
      const delTab = state.tabList[0];
      if ((delTab.path === '/' || delTab.path === '/admin') && state.tabList.length === 1) {
        return;
      }
      state.tabList = [];
      // 设置tab key
      state.refreshKeys = {};
    },
    // 切换显示tab项
    [types.TOGGLE_TABS](state, status) {
      state.isTabsShow = status;
      // 关闭tab时，取tabList当前项
      if (!status) {
        state.tabList = [state.tabList[state.curTabIndex]];
        state.curTabIndex = 0;
      }
    },
  },
  actions: {
    // 新增
    addTab({ commit }, newTabItem) {
      commit(types.ADD_TAB, newTabItem);
    },
    // 删除
    delTab({ commit, state }, delTabIndex) {
      return new Promise((resolve) => {
        commit(types.DEL_TAB, delTabIndex);
        resolve([...state.tabList]);
      });
    },
  },
};

export default tabs;
