import React, { useState } from 'react'

import Node from './Node'

export default function Visualizer() {
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

  const handleMouseDown = (row, col) => {
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

  const getGraph = grid.map((row, rowIdx) => (
    <div key={rowIdx}>
      {row.map((node, nodeIdx) => (
        <Node
          key={nodeIdx}
          row={node.row}
          column={node.column}
          isWall={node.isWall}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
          handleMouseUp={handleMouseUp}
          handleDrag={handleDrag}
        />
      ))}
    </div>
  ))

  return (
    <div>
      <button
        onClick={() => {
          setGrid(getEmptyGrid())
        }}
      >
        CLEAR
      </button>
      <div className="grid">{getGraph}</div>
    </div>
  )
}
