export const dfs = (grid, startNode, endNode) => {
  let visitedNodesInOrder = []
  let prevNode = startNode
  let curNode = startNode
  startNode.isVisited = true
  let unvisitedNodes = grid.flat()

  while (unvisitedNodes.length > 0) {
    prevNode.isVisited = true
    prevNode = curNode

    let temp = getNextNode(grid, curNode)
    let tempNode = curNode

    // Loop to backtrack incase an end was met
    while (temp.length === 0) {
      tempNode = tempNode.previousNode
      temp = getNextNode(grid, tempNode)
      console.log('BACKTRACKING!')
    }
    prevNode = tempNode
    curNode = temp[0]

    if (curNode.isWall) continue

    // Might have to keep track of distance to handle no-path-found error

    curNode.isVisited = true
    visitedNodesInOrder.push(curNode)
    curNode.previousNode = prevNode

    if (curNode === endNode) return visitedNodesInOrder
  }
}

const getNextNode = (grid, node) => {
  let neighbours = []
  const { row, column } = node
  if (row < grid.length - 1) neighbours.push(grid[row + 1][column])
  if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1])
  if (row > 0) neighbours.push(grid[row - 1][column])
  if (column > 0) neighbours.push(grid[row][column - 1])
  //console.log('N: ', neighbours)
  // Return only nodes that have not yet been visited
  return neighbours.filter(neighbour => !neighbour.isVisited && !neighbour.isWall)
}
