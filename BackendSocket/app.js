require ("dotenv").config()
const express = require ("express")
const cors = require ("cors")
const morgan = require ("morgan")
const database = require("./connection")
const http = require("http")
const SocketIo = require("socket.io")

require("./connection")

const app = express()
const SocketServer = http.createServer(app)
const io = new SocketIo.Server(SocketServer, {
    cors: {
        origin: '*',
    }
})
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on('mensaje', (msg) => {
        socket.broadcast.emit('mensaje', {
            body: msg,
            de: socket.id
        })
    })
})

database()

const port = process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(require("./src/routes/user.routes"))
app.use(require("./src/routes/task.routes"))
app.use(require("./src/routes/auth.routes"))
app.use(require("./src/routes/coords.routes"))

SocketServer.listen(port, ()=>{
    console.log(`Servidor corriendo en: http://localhost:${port}`)
})