const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

app.post('/comment', (req, res) => {
  res.cookie('session_id_secure', 'secure_token', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false 
  })
  console.log('[SECURE] Comment received:', req.body.content)
  res.send({ status: 'Secure comment received' })
})

app.post('/insecure-comment', (req, res) => {
  res.cookie('session_id_insecure', 'vulnerable_token', {
    httpOnly: false,
    sameSite: 'Lax',
    secure: false
  })
  console.log('[INSECURE] Comment received:', req.body.content)
  res.send({ status: 'Insecure comment received' })
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
