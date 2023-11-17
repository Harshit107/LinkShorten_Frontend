import React from 'react'
import classes from './Button.module.css'

export default function Button(props) {
    const className = `${classes.button} ${props.className}`
    return (
        <button className={className} {...props.action}>{props.text}</button>
    )
}
