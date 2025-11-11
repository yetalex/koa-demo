import app from './app.js'
import { config } from '@config/index.js'

const server = app.listen(config.port, () => {
    console.log(`Server listening on http://localhost:${config.port}`)
})

process.on('SIGINT', () => server.close(() => process.exit(0)))
process.on('SIGTERM', () => server.close(() => process.exit(0)))