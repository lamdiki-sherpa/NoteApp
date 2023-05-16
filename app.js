require('dotenv').config()
const express=require('express')
const app = express()

const router=require('./route/app')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/note',router)

const connectDB=require('./db/connect')
app.get('/',(req,res)=>{
    res.send('hello from node')
})


const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();