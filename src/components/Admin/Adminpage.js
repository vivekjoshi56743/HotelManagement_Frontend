import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from './AdminNav'

export default function Adminpage() {
  return (
    <>
    <AdminNav/>
    <Outlet/>
    </>
  )
}
