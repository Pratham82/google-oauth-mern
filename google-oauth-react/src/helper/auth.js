import { toast } from 'react-toastify'
const TOKEN_KEY = 'googleJwtToken'
const PERMISSION_KEY = 'permissionsForUser'

export const login = (data, permissions) => {
  localStorage.setItem(TOKEN_KEY, data)
  localStorage.setItem(PERMISSION_KEY, JSON.stringify(permissions))
}

export const logout = () => {
  toast.success('Logged Out successfully')
  localStorage.removeItem(TOKEN_KEY)
  // window.location.replace('/login)
}

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true
  }
  return false
}

export const getPermission = () => {
  return JSON.parse(localStorage.getItem(PERMISSION_KEY))
}
