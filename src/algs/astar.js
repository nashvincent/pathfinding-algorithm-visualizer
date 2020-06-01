//https://github.com/clementmihailescu/Pathfinding-Visualizer/blob/c51f2d5fd3386b485694581ca0f324cf343f39b1/public/browser/pathfindingAlgorithms/astar.js

export const astar = (grid, startNode, endNode) => {
  const visitedNodesInOrder = []
  startNode.distance = 0
  startNode.totalDistance = 0
  startNode.heuristicDistance = 0
  startNode.direction = 'up'
  let unvisitedNodes = grid.flat()
  while (unvisitedNodes.length > 0) {
    // Get the closest node depending on totalDistance and heuristic distance
    let closestNode = getClosestNode(unvisitedNodes)

    // if the node is a wall, do nothing
    if (closestNode.isWall) continue

    // if theres no closests node, stop the algorithm
    if (closestNode.distance === Infinity) return visitedNodesInOrder

    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode)

    if (closestNode === endNode) return visitedNodesInOrder

    // Update the distances and other properties of neighbouring nodes
    updateClosestNeighbours(grid, closestNode, endNode)
  }
}

const getClosestNode = unvisitedNodes => {
  let currentClosest
  let idx
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (
      !currentClosest ||
      currentClosest.totalDistance > unvisitedNodes[i].totalDistance
    ) {
      currentClosest = unvisitedNodes[i]
      idx = i
    } else if (currentClosest.totalDistance === unvisitedNodes[i].totalDistance) {
      if (currentClosest.heuristicDistance > unvisitedNodes[i].heuristicDistance) {
        currentClosest = unvisitedNodes[i]
        idx = i
      }
    }
  }
  unvisitedNodes.splice(idx, 1)
  return currentClosest
}

// This is where the tough part begins
const updateClosestNeighbours = (grid, currentNode, endNode) => {
  const neighbours = getClosestNeighbours(grid, currentNode)
  neighbours.forEach(neighbour => {
    updateNode(currentNode, neighbour, endNode, grid)
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

const updateNode = (currentNode, targetNode, endNode, grid) => {
  let distance = getDistance(currentNode, targetNode)

  if (!targetNode.heuristicDistance)
    targetNode.heuristicDistance = manhattanDistance(targetNode, endNode)

  let finalDistance = currentNode.distance + distance[0]
  if (finalDistance < targetNode.distance) {
    targetNode.distance = finalDistance
    targetNode.totalDistance = targetNode.distance + targetNode.heuristicDistance
    targetNode.previousNode = currentNode
    targetNode.direction = distance[2]
  }
}

// TODO: Refactor!!!
const getDistance = (n1, n2) => {
  let x1 = n1.row
  let y1 = n1.column
  let x2 = n2.row
  let y2 = n2.column
  if (x2 < x1 && y1 === y2) {
    if (n1.direction === 'up') {
      return [1, ['f'], 'up']
    } else if (n1.direction === 'right') {
      return [2, ['l', 'f'], 'up']
    } else if (n1.direction === 'left') {
      return [2, ['r', 'f'], 'up']
    } else if (n1.direction === 'down') {
      return [3, ['r', 'r', 'f'], 'up']
    } else if (n1.direction === 'up-right') {
      return [1.5, null, 'up']
    } else if (n1.direction === 'down-right') {
      return [2.5, null, 'up']
    } else if (n1.direction === 'up-left') {
      return [1.5, null, 'up']
    } else if (n1.direction === 'down-left') {
      return [2.5, null, 'up']
    }
  } else if (x2 > x1 && y1 === y2) {
    if (n1.direction === 'up') {
      return [3, ['r', 'r', 'f'], 'down']
    } else if (n1.direction === 'right') {
      return [2, ['r', 'f'], 'down']
    } else if (n1.direction === 'left') {
      return [2, ['l', 'f'], 'down']
    } else if (n1.direction === 'down') {
      return [1, ['f'], 'down']
    } else if (n1.direction === 'up-right') {
      return [2.5, null, 'down']
    } else if (n1.direction === 'down-right') {
      return [1.5, null, 'down']
    } else if (n1.direction === 'up-left') {
      return [2.5, null, 'down']
    } else if (n1.direction === 'down-left') {
      return [1.5, null, 'down']
    }
  }
  if (y2 < y1 && x1 === x2) {
    if (n1.direction === 'up') {
      return [2, ['l', 'f'], 'left']
    } else if (n1.direction === 'right') {
      return [3, ['l', 'l', 'f'], 'left']
    } else if (n1.direction === 'left') {
      return [1, ['f'], 'left']
    } else if (n1.direction === 'down') {
      return [2, ['r', 'f'], 'left']
    } else if (n1.direction === 'up-right') {
      return [2.5, null, 'left']
    } else if (n1.direction === 'down-right') {
      return [2.5, null, 'left']
    } else if (n1.direction === 'up-left') {
      return [1.5, null, 'left']
    } else if (n1.direction === 'down-left') {
      return [1.5, null, 'left']
    }
  } else if (y2 > y1 && x1 === x2) {
    if (n1.direction === 'up') {
      return [2, ['r', 'f'], 'right']
    } else if (n1.direction === 'right') {
      return [1, ['f'], 'right']
    } else if (n1.direction === 'left') {
      return [3, ['r', 'r', 'f'], 'right']
    } else if (n1.direction === 'down') {
      return [2, ['l', 'f'], 'right']
    } else if (n1.direction === 'up-right') {
      return [1.5, null, 'right']
    } else if (n1.direction === 'down-right') {
      return [1.5, null, 'right']
    } else if (n1.direction === 'up-left') {
      return [2.5, null, 'right']
    } else if (n1.direction === 'down-left') {
      return [2.5, null, 'right']
    }
  }
}

const manhattanDistance = (n1, n2) => {
  let dx = Math.abs(n1.row - n2.row)
  let dy = Math.abs(n1.column - n2.column)
  return dx + dy
}
