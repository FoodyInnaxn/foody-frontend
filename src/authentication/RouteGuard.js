import { UserContext } from '../App'
import React, { useContext } from "react"

export const RouteGuardEmployee = ({ redirectPath = '/login', children, }) => {
    const { user } = useContext(UserContext)
     if (user === null || user.roles.includes("USER")) 
     window.location.href = redirectPath; 
     return children; 
}