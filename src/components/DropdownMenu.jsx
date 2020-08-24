import React from 'react'
import DropdownItem from './DropdownItem'

import { ReactComponent as ArrowIcon } from '../assets/arrow.svg'

function DropdownMenu(props) {
  const handleSelect = alg => {
    props.handleCloseDropdown()
    props.handleSetNewAlg(alg)
  }

  return (
    <div className="dropdown">
      <DropdownItem icon={<ArrowIcon />} alg="dijkstra" handleSelect={handleSelect}>
        Dijkstra
      </DropdownItem>
      <DropdownItem icon={<ArrowIcon />} alg="astar" handleSelect={handleSelect}>
        A* Search
      </DropdownItem>
      <DropdownItem icon={<ArrowIcon />} alg="greedy" handleSelect={handleSelect}>
        Greedy Best First
      </DropdownItem>
      <DropdownItem icon={<ArrowIcon />} alg="dfs" handleSelect={handleSelect}>
        Depth First Search
      </DropdownItem>
    </div>
  )
}

export default DropdownMenu
