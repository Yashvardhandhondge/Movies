const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const Port = process.env.Port;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

const MONGO_URL =(process.env.MONGODB_URL);

const {mediaRoutes} = require('./routes/mediaroute');
const {personRoutes} = require('./routes/personroute');
const {reviewRoute} = require('./routes/reviewroutes');
const {userRoutes} = require('./routes/userroute')

app.use('/media',mediaRoutes)
app.use('/person',personRoutes);
app.use('/review',reviewRoute);
app.use('/user',userRoutes);

async function connect(){
    try{

        await mongoose.connect(MONGO_URL);
        console.log('Mongodb connected');
    }catch(e){
        console.error(e);
    }
}
connect()

app.listen(Port,()=>{
    console.log(`App is listening to the ${Port}`)
})