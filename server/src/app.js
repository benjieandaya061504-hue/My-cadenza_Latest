const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')

const app = express()

// CORS - allow Vite dev server and Vercel production domain
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true)
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
    ]
    
    // In production, VITE_API_URL will be set
    if (process.env.VITE_API_URL) {
      allowedOrigins.push(process.env.VITE_API_URL.replace(/\/+$/, ''))
    }
    
    // Also allow any Vercel deployment (wildcard)
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true)
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    
    console.warn(`CORS blocked origin: ${origin}`)
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
  res.send('Cadenza Music Center API')
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred.',
  })
})

module.exports = app