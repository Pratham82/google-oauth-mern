import axios from 'axios'
import { toast } from 'react-toastify'
import { login } from '../helper/auth'
export const googleLogin = token => {
  let data = { tokenId: token }
  axios
    .post(process.env.REACT_APP_BACKEND_URL + '/auth/google/google-login', data)
    .then(response => {
      toast.success('Successful Login yay 😄')
    })
    .catch(error => {
      toast.error('Unsuccessful Login sorry 😢')
    })
}
