function doMathId(matchedItemObj, menuData, currentPath) {
  menuData.forEach(item => {
    if (item.menuUrl === currentPath) {
      matchedItemObj.push(item, item.id)
    } else if (item.children && item.children.length > 1) {
      doMathId(matchedItemObj, item.children, currentPath)
    }
  })
}

function queryBreadChain(menuId, matchedItemObj, menuData) {
  menuData.forEach(item => {
    if (item.id === menuId) {
      const parentId = item.parentId
      matchedItemObj.push(item)
      if (parentId && parentId !== '0') {
        queryBreadChain(parentId, matchedItemObj, menuData)
      }
    }
  })
}

export function matchBreadData(currentPath, menuData) {
  let matchedData = []
  let matchedItemObj = []

  if (!menuData || menuData.length === 0) {
    return matchedData
  }

  doMathId(matchedItemObj, menuData, currentPath)

  if (matchedItemObj.length <= 1) {
    return matchedData
  }

  const parentId = matchedItemObj[0]['parentId']
  matchedData.push(matchedItemObj[0])

  if (!parentId || parentId === '0') {
    return matchedData
  } else {
    matchedItemObj = []
    queryBreadChain(parentId, matchedItemObj, menuData)
    matchedData = matchedData.concat(matchedItemObj)
  }
  return matchedData.reverse()
}
