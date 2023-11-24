import React from 'react'
import DashboardIndex from '../component/dashboard/DashboardIndex'
import {isLoggedIn} from '../helper/Common.js'

export default function Dashboard() {
  return (
    <DashboardIndex />
  )
}

export const loader = async() => await isLoggedIn();
