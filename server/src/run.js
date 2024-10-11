require('dotenv').config()
const app = require('./app')
const PORT = process.env.PORT || 8989

async function init () {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
}

init()
