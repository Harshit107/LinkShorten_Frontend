import React from 'react'
import Header from '../component/header/Header'
import { Outlet } from 'react-router-dom'

export default function Root() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
