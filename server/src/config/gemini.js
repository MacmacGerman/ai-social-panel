import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY environment variable')
}

const genAI = new GoogleGenerativeAI(apiKey)

// Get the generative model
export const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

export default genAI
