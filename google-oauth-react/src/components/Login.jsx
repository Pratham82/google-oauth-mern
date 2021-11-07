import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { googleLogin } from '../api/googleLogin'
import { logout } from '../helper/auth'

export default function Login() {
  const loginResponseSuccess = response => {
    console.log('Login Success')
    console.log(response)
    const tokenId = response.tokenObj.id_token
    googleLogin(tokenId)
  }
  const loginResponseFailure = response => {
    console.log('Login Failed')
    console.log(response)
  }
  const logoutResponseSuccess = response => {
    logout()
  }

  return (
    <div className="login-card">
      <h2>Google Login</h2>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={loginResponseSuccess}
        onFailure={loginResponseFailure}
        cookiePolicy={'single_host_origin'}
      />
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onLogoutSuccess={logoutResponseSuccess}
        cookiePolicy={'single_host_origin'}
      />
      <ToastContainer />
    </div>
  )
}
