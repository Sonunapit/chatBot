const express = require('express')
const cors = require('cors')
const generateResponse = require('./service/ai.service')

const app = express()

app.use(cors())
app.use(express.json())  // body parse karne ke liye

app.get('/', (req, res) => {
    res.send("Hello world")
})

// Naya chat route
app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body
    
    // history ko Gemini format mein convert karo
    const chatHistory = history.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
    }))
    
    chatHistory.push({ role: 'user', parts: [{ text: message }] })
    
    const reply = await generateResponse(chatHistory)
    res.json({ reply })
})

module.exports = app;