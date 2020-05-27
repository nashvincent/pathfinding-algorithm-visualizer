import React from 'react'

export default function Node({
  row,
  column,
  isStart,
  isEnd,
  isWall,
  isVisited,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}) {
  const style = isStart
    ? 'start-node'
    : isEnd
    ? 'end-node'
    : isVisited
    ? 'visited'
    : isWall
    ? 'wall'
    : ''

  return (
    <div
      id={`node-${row}-${column}`}
      className={`node ${style}`}
      onMouseDown={e => handleMouseDown(row, column, e)}
      onMouseEnter={() => handleMouseEnter(row, column)}
      onMouseUp={() => handleMouseUp()}
    ></div>
  )
}
