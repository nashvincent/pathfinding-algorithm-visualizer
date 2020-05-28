export const dijkstra = (grid, startNode, endNode) => {
  // Array to track the order in which the search nodes should be animated
  const visitedNodesInOrder = []
  startNode.distance = 0
  let unvisitedNodes = grid.flat()
  while (unvisitedNodes.length > 0) {
    // sort the array in ascending order based on distance
    unvisitedNodes.sort((a, b) => a.distance - b.distance)
    // pop out the value at index 0
    const closestNode = unvisitedNodes.shift()

    // if the node is a wall, do nothing
    if (closestNode.isWall) continue

    // if theres no closests node, stop the algorithm
    if (closestNode.distance === Infinity) return visitedNodesInOrder

    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode)

    if (closestNode === endNode) return visitedNodesInOrder

    // otherwise update neighbours
    updateClosestNeighbours(grid, closestNode)
  }
}

export const getShortestPath = endNode => {
  let shortestPath = []
  let currentNode = endNode
  while (currentNode !== null) {
    shortestPath.unshift(currentNode)
    currentNode = currentNode.previousNode
  }
  return shortestPath
}

const updateClosestNeighbours = (grid, node) => {
  const neighbours = getClosestNeighbours(grid, node)
  neighbours.forEach(neighbour => {
    neighbour.distance = node.distance + 1
    neighbour.previousNode = node
  })
}

const getClosestNeighbours = (grid, node) => {
  let neighbours = []
  const { row, column } = node
  if (row > 0) neighbours.push(grid[row - 1][column])
  if (row < grid.length - 1) neighbours.push(grid[row + 1][column])
  if (column > 0) neighbours.push(grid[row][column - 1])
  if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1])

  // Return only nodes that have not yet been visited
  return neighbours.filter(neighbour => !neighbour.isVisited && !neighbour.isWall)
}
