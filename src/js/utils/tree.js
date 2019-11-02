// 降序排
function sortByDesc(a, b) {
  return b.sortNo - a.sortNo;
}

// 升序排
function sortByAsc(a, b) {
  return a.sortNo - b.sortNo;
}

// 数组转换成树结构
export const listToTree = function listToTree(data, sOptions) {
  // 拷贝原数组
  const list = [...data];
  const options = { ...sOptions }
  // 默认是降序排
  const sortWay = options.sortByDesc ? sortByDesc : sortByAsc;
  const ID_KEY = options.idKey || 'id';
  const PARENT_KEY = options.parentKey || 'parentId';
  const CHILDREN_KEY = options.childrenKey || 'children';

  const tree = [];
  const childrenOf = {};
  let item;
  let id;
  let parentId;

  // 先排一次序
  list.sort(sortWay);

  for (let i = 0; i < list.length; i += 1) {
    item = list[i];
    id = item[ID_KEY];
    parentId = item[PARENT_KEY] || '0';
    // every item may have children
    childrenOf[id] = childrenOf[id] || [];
    // init its children
    item[CHILDREN_KEY] = childrenOf[id];
    if (parentId !== '0' && parentId !== '') {
      // init its parent's children object
      childrenOf[parentId] = childrenOf[parentId] || [];
      // push it into its parent's children object
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
  }
  return tree;
};
