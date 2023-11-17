import React from 'react'
import classes from './DashboardIndex.module.css';
import DashboardHeading from './DashboardHeading';
import ShortLink from './ShortLink';

export default function DashboardIndex() {
  return (
    <div className={classes['main-container']}>
      <DashboardHeading />
      <ShortLink />
    </div>
  )
}
