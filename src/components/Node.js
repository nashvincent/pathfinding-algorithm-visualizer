import React from 'react'

export default function Node({
  row,
  column,
  isWall,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}) {
  const style = isWall ? 'wall' : ''

  return (
    <div
      className={`node ${style}`}
      onMouseDown={() => handleMouseDown(row, column)}
      onMouseEnter={() => handleMouseEnter(row, column)}
      onMouseUp={() => handleMouseUp()}
    ></div>
  )
}
