import React from 'react'
import classes from './DataKeyValue.module.css'

export default function DataKeyValue(props) {
    return (
        <div className={`${classes.container} ${props.className ?? ''}`}>
            <div className={classes.key}>
                <div>{props.titleIcon}</div>
                <div>{props.title}</div>
            </div>
            <div className={classes.value + ' single-line'}>
                <div>{props.value}</div>
                <div>{props.valueIcon}</div>
            </div>
        </div>
    )
}
