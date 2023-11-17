import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'
export default function Header() {
  return (
    <header>
        <div>
            <p>LOGO</p>
            <NavLink to={'/'} className={({isActive }) => isActive ? classes.active : ''} >Dashboard</NavLink>
        </div>
        <div>
            <p>API</p>
            <p>Logout</p>
        </div>
    </header>
  )
}
