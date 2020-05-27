import React, { useState } from 'react'

import Node from './Node'
import { dijkstra, getShortestPath } from '../algs/dijkstra'

// Setting the coordinates for the start node and the end node
const SROW = 6
const SCOL = 7
const EROW = 6
const ECOL = 20

export default function Visualizer() {
  // Creates a 2D array that makes up the grid
  const getEmptyGrid = () => {
    let nodes = []
    // row
    for (let i = 0; i < 15; i++) {
      let currentRow = []
      // column
      for (let j = 0; j < 30; j++) {
        currentRow.push(createNode(i, j))
      }
      nodes.push(currentRow)
    }
    return nodes
  }

  const createNode = (row, column) => {
    return {
      row,
      column,
      isWall: false,
      isStart: row === SROW && column === SCOL,
      isEnd: row === EROW && column === ECOL,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    }
  }

  const [grid, setGrid] = useState(getEmptyGrid)
  const [mouseIsPressed, setMouseIsPressed] = useState(false)

  // Returns a new grid with the specified node turned into a wall
  const getUpdatedGrid = (row, col) => {
    let updatedNode = grid[row][col]
    updatedNode = {
      ...updatedNode,
      isWall: !updatedNode.isWall,
    }

    let updatedGrid = grid.slice()
    updatedGrid[row][col] = updatedNode
    return updatedGrid
  }

  const handleMouseDown = (row, col, event) => {
    // Prevents dragging of nodes which can break the app
    event.preventDefault()

    setMouseIsPressed(false)
    const updatedGrid = getUpdatedGrid(row, col)
    setGrid(updatedGrid)
    setMouseIsPressed(true)
  }

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return

    const updatedGrid = getUpdatedGrid(row, col)
    setGrid(updatedGrid)
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false)
  }

  const getGrid = grid.map((row, rowIdx) => (
    <div key={rowIdx}>
      {row.map((node, nodeIdx) => (
        <Node
          key={nodeIdx}
          row={node.row}
          column={node.column}
          isWall={node.isWall}
          isStart={node.isStart}
          isEnd={node.isEnd}
          isVisited={node.isVisited}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
          handleMouseUp={handleMouseUp}
        />
      ))}
    </div>
  ))

  const animateNodes = (nodeList, shortestPath) => {
    nodeList.forEach((node, nodeIdx) => {
      if (nodeIdx === nodeList.length - 1) {
        setTimeout(() => {
          animateShortestPath(shortestPath)
        }, 50 * nodeIdx)
      }

      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.column}`).className =
          'node visited'
      }, 50 * nodeIdx)
    })
  }

  const animateShortestPath = shortestPath => {
    shortestPath.forEach((node, nodeIdx) => {
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.column}`).className =
          'node shortest-path'
      }, 40 * nodeIdx)
    })
  }

  const visualize = () => {
    const visitedNodesInOrder = dijkstra(grid, grid[SROW][SCOL], grid[EROW][ECOL])
    const shortestPath = getShortestPath(grid[EROW][ECOL])

    animateNodes(visitedNodesInOrder, shortestPath)
  }

  return (
    <div>
      <button
        onClick={() => {
          setGrid(getEmptyGrid())
        }}
      >
        CLEAR
      </button>

      <button
        onClick={() => {
          visualize()
        }}
      >
        VISUALIZE
      </button>
      <div className="grid">{getGrid}</div>
    </div>
  )
}
