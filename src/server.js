import express from 'express'
import routes from './router/index.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { Server } from 'socket.io'
import { chatDAO } from './DAO/chatDAO.js';
import { normalizedMessages } from './utils/normalize.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express()
const expressServer = app.listen(8080, () => console.log('Server escuchando en el puerto 8080'))
const io = new Server(expressServer)

//Configuracion session
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://ludmi:lcordivi1198@cluster0.oxbotfj.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true, //ACA LO QUE HACEMOS ES DECIRLE QUE NOS RENUEVE EL TIEMPO DE EXPIRACION DE LA SESION CON CADA REQUEST
    cookie: {
      maxAge: 120000,
    },
  })
)

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname,'./views')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

//Aca vienen las interacciones de io: servidor<-->cliente
io.on('connection', async socket =>  {
    console.log(`Se conecto el cliente con id: ${socket.id}`)
    // socket.emit('server:products', await contenedor.getAll())

    //recibo los mensajes de la base altasMongo y los guardo en una variable, normalizo y envio al socket
    const messagesFromMongo = await chatDAO.getAll()
    const normalizedChat = normalizedMessages(messagesFromMongo)

    //Envio mensajes normalizados al front
    socket.emit('server:mensajes', normalizedChat)

    //Evento de carga de nuevo producto
    // socket.on('client:newProduct', async (newProductInfo) => {
    //     await contenedor.postProduct(newProductInfo)
    //     io.emit('server:products', await contenedor.getAll())
    // })
    
    //Evento de nuevo mensaje
    socket.on('client:message', async (messageInfo) => {
        await chatDAO.postMessage(messageInfo)

        //recibo los mensajes de la base altasMongo y los guardo en una variable, normalizo y envio al socket
        const messagesFromMongo = await chatDAO.getAll()
        const normalizedChat = normalizedMessages(messagesFromMongo)
        io.emit('server:mensajes', normalizedChat)
    })
})

app.use('/api', routes)