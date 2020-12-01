import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import postList from './routes/list/postList';
import deleteList from './routes/list/deleteList';
import deleteRoom from './routes/room/deleteRoom';
import getRoomsByUser from './routes/room/getRoomsByUser';
import postRoom from './routes/room/postRoom';
import signIn from './routes/auth/signIn';
import signUp from './routes/auth/signUp';
import getUsersListsAndRooms from './routes/list/getUsersListsAndRooms';

/* //* don't add auth yet. Create the logic for Daniel do get and push data. Use only for now but later I'll have to get around doing it . */

mongoose.set('useCreateIndex', true);

const app = express()

// app.use(cors())
app.use(express.json())

app.use('/auth', signIn, signUp)
app.use('/room', deleteRoom, getRoomsByUser, postRoom)
app.use('/list', deleteList, postList)
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
