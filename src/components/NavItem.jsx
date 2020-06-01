import React, { useState } from 'react'

import './Navbar.css'

function NavItem(props) {
  const [open, setOpen] = useState(false)

  const handleCloseDropdown = () => setOpen(false)

  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      handleCloseDropdown,
    })
  })

  return (
    <li className="nav-item">
      <a
        href=""
        className="icon-button nav-a"
        onClick={e => {
          e.preventDefault()
          props.handleClick ? props.handleClick(e, handleCloseDropdown) : setOpen(!open)
        }}
      >
        {props.icon}
      </a>
      {open && children}
    </li>
  )
}

export default NavItem
