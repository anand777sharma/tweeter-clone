const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

global.__basedir = __dirname;

dotenv.config();
mongoose.connect(process.env.URL);
mongoose.connection.on('connected',()=>{
    console.log("db connected")
})
mongoose.connection.on('error',(error)=>{
    console.log("error")
})

app.use(cors());
app.use(express.json());

// app.use('/uploads',express.static('uploads'));
app.use('/api/auth',require('./routes/auth_route'));
app.use('/api/user',require('./routes/user_route'));
app.use('/api/tweet',require('./routes/tweet_route'));
app.use('/api/file',require('./routes/file_route'));



app.listen(process.env.PORT, () => {
    console.log("Server started");
});