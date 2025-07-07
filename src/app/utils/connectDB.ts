import mongoose from 'mongoose'
import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI || ''

export default async function connentDB() {
  if (mongoose.connection.readyState === 1) return
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ MongoDB connected')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
  }
}