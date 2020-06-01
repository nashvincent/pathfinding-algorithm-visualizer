import React from 'react'

function DropdownItem(props) {
  const handleChangeAlgorithm = event => {
    event.preventDefault()
    props.handleSelect(props.alg)
  }

  return (
    <a href="" className="dropdown-item nav-a" onClick={e => handleChangeAlgorithm(e)}>
      <span className="icon-button">{props.icon}</span>
      {props.children}
    </a>
  )
}

export default DropdownItem
