import React from 'react'
import classes from './Circle.module.css'
export default function Circle(props) {
    const className = `${classes.circle} ${props.className}`
  return (
    <div className={className}>
        {props.children}
    </div>
  )
}
