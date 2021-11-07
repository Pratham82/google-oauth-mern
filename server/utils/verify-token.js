const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const verifyToken = async token => {
  let response = {}
  const ticket = await client
    .verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then(res => {
      response = res
    })
    .catch(err => {
      response = err
    })
  return response
}

module.exports = verifyToken
