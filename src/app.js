const express = require('express')
const { rootRouter: useApi } = require('./routes')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(useApi)

app.get('/', (req, res) => {
    res.send(`app is running at ${PORT}`)
})
app.listen(PORT, () => {
    console.log(`app is running at`)
})
