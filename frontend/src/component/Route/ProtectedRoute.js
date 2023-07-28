import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" />
    }
    return children ? children : <Outlet />
}

export default ProtectedRoute