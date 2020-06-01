import React, { useState } from 'react'

import Node from './Node'
import Navbar from '../components/Navbar'
import NavItem from '../components/NavItem'
import DropdownMenu from '../components/DropdownMenu'
import { dijkstra, getShortestPath } from '../algs/dijkstra'
import { astar } from '../algs/astar'
import { dfs } from '../algs/dfs'

import { ReactComponent as ClearAllIcon } from '../assets/clearAll.svg'
import { ReactComponent as ClearAnimationsIcon } from '../assets/clearAnimations.svg'
import { ReactComponent as SettingsIcon } from '../assets/settings.svg'
import { ReactComponent as StartIcon } from '../assets/start.svg'
import { ReactComponent as MazeIcon } from '../assets/maze.svg'

// TODO:
// Add Tooltips for each icon in Navbar
// Refactor code to use Refs instead of directly accessing the DOM for animations
// Fix walls-drawn-without-clicking bug when mouse goes outside the grid
// Handle edge cases like preventing new walls from being drawn during animation
// Learn and implement A* algorithm
// Learn and implement Bidirectional Swarm Algorithm
// Learn and implement Recursive Division algorithm to make a maze using walls
// Work on UI/UX
// Get rid of all warnings

// OPTIONALS:
// Find a way to make the start and end node distinct even AFTER animations
// Find a way to make the start and end node dynamic
// Find a way to have live updation of the algorithm path and shortest path by moving the start/end node AFTER animation has been done
// Learn and implement other algorithms

// Settings the number of rows and columns
const ROWS = 15
const COLS = 30
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
    for (let i = 0; i < ROWS; i++) {
      let currentRow = []
      // column
      for (let j = 0; j < COLS; j++) {
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
      totalDistance: Infinity,
      heuristicDistance: null,
      isVisited: false,
      previousNode: null,
      direction: null,
    }
  }

  const [grid, setGrid] = useState(getEmptyGrid)
  const [mouseIsPressed, setMouseIsPressed] = useState(false)
  const [currentAlg, setCurrentAlg] = useState('dijkstra')

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
    let animTime = 50
    nodeList.forEach((node, nodeIdx) => {
      if (nodeIdx === nodeList.length - 1) {
        setTimeout(() => {
          animateShortestPath(shortestPath)
        }, animTime * nodeIdx)
      }

      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.column}`).className =
          'node visited'
      }, animTime * nodeIdx)
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
    let visitedNodesInOrder
    switch (currentAlg) {
      case 'dijkstra':
        visitedNodesInOrder = dijkstra(grid, grid[SROW][SCOL], grid[EROW][ECOL])
        break

      case 'astar':
        visitedNodesInOrder = astar(grid, grid[SROW][SCOL], grid[EROW][ECOL])
        break

      case 'dfs':
        visitedNodesInOrder = dfs(grid, grid[SROW][SCOL], grid[EROW][ECOL])
        break

      default:
        visitedNodesInOrder = dijkstra(grid, grid[SROW][SCOL], grid[EROW][ECOL])
        break
    }
    const shortestPath = getShortestPath(grid[EROW][ECOL])
    //console.log(shortestPath)

    animateNodes(visitedNodesInOrder, shortestPath)
  }

  // Fn to handle clearing the animations and also the walls depending on the value of the boolean clearWalls
  const clearAnimations = clearWalls => {
    let clearedGrid = grid.slice()
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (clearWalls === true) {
          clearedGrid[i][j] = createNode(i, j)
          document.getElementById(`node-${i}-${j}`).className = 'node'
        } else {
          if (!clearedGrid[i][j].isWall) {
            clearedGrid[i][j] = createNode(i, j)
            document.getElementById(`node-${i}-${j}`).className = 'node'
          }
        }
      }
    }
    setGrid(clearedGrid)
    document.getElementById(`node-${SROW}-${SCOL}`).className = 'node start-node'
    document.getElementById(`node-${EROW}-${ECOL}`).className = 'node end-node'
  }

  const generateRandomMaze = () => {
    clearAnimations(true)
    let tempGrid = grid.slice()
    tempGrid.forEach(row => {
      row.forEach(node => {
        let isMazeWall = Math.random() >= 0.68
        if (isMazeWall) {
          if (node !== grid[SROW][SCOL] && node !== grid[EROW][ECOL]) node.isWall = true
        }
      })
    })
    setGrid(tempGrid)
  }

  const handleSetNewAlg = alg => setCurrentAlg(alg)

  return (
    <div>
      <Navbar>
        <NavItem icon={<StartIcon />} handleClick={e => visualize(e)} />
        <NavItem icon={<MazeIcon />} handleClick={e => generateRandomMaze(e)} />
        <NavItem icon={<ClearAllIcon />} handleClick={e => clearAnimations(true, e)} />
        <NavItem
          icon={<ClearAnimationsIcon />}
          handleClick={e => clearAnimations(false, e)}
        />
        <NavItem icon={<SettingsIcon />}>
          <DropdownMenu handleSetNewAlg={handleSetNewAlg}>
            <p>HelloWorld</p>
          </DropdownMenu>
        </NavItem>
      </Navbar>
      <div className="grid">{getGrid}</div>
    </div>
  )
}
