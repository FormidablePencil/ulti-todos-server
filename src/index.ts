import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import deleteRoom from './routes/Room/delete';
import getRoom from './routes/Room/get';
import putRoom from './routes/Room/put';
import deleteList from './routes/list/delete';
import getList from './routes/list/get';
import putList from './routes/list/put';

/* //* don't add auth yet. Create the logic for Daniel do get and push data. Use only for now but later I'll have to get around doing it . */

mongoose.set('useCreateIndex', true);

const app = express()

// app.use(cors())
app.use(express.json())

app.use('/room', deleteRoom, getRoom, putRoom)
app.use('/list', deleteList, getList, putList)

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db'))
mongoose.connection
  .once('open', () => console.log('connection to mongoDb successful'))
  .on('error', (err) => {
    console.log(err, 'err in connecting to mongoDb')
  })

app.listen(process.env.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT}`)
})
