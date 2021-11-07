import { toast } from 'react-toastify'
const TOKEN_KEY = 'googleJwtToken'

export const login = (data, permissions) => {
  localStorage.setItem(TOKEN_KEY, data)
}

export const logout = () => {
  toast.success('Logged Out successfully')
  localStorage.removeItem(TOKEN_KEY)
}

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true
  }
  return false
}
