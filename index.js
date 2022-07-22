const express = require('express')

const app = express()
const PORT = 3001

app.get('/', (req, res) => {
    res.send('Hello there!')
})

app.get('/timestamp', (req, res) => {
    res.send(Date().toString())
})

const server = app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})
