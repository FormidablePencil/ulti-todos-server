import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import createList from './routes/list/createList';
import deleteList from './routes/list/deleteList';
import leaveRoom from './routes/room/leaveRoom';
import getRoomsByUser from './routes/room/getRoomsByUser';
import createRoom from './routes/room/createRoom';
import signIn from './routes/auth/signIn';
import signUp from './routes/auth/signUp';
import getUsersListsAndRooms from './routes/list/getUsersListsAndRooms';
import updateTodos from './routes/list/updateTodos';
import getListsFromRoom from './routes/list/getListsFromRoom';

/* //* don't add auth yet. Create the logic for Daniel do get and push data. Use only for now but later I'll have to get around doing it . */

mongoose.set('useCreateIndex', true);

const app = express()

// app.use(cors())
app.use(express.json())

app.use('/auth', signIn, signUp)
app.use('/room', leaveRoom, getRoomsByUser, createRoom)
app.use('/list', getListsFromRoom, deleteList, createList, updateTodos)
app.use('/', getUsersListsAndRooms)

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db'))
mongoose.connection
  .once('open', () => console.log('connection to mongoDb successful'))
  .on('error', (err) => {
    console.log(err, 'err in connecting to mongoDb')
  })

app.listen(process.env.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT}`)
})
