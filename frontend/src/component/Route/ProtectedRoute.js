import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useSelector((state) => state.user);
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    return children ? children : <Outlet />
}

export default ProtectedRoute