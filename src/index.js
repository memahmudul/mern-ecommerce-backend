//extarnal import
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');

//internal import
const {notFoundHandler} = require('./middlewares/common/errorhandler');
const {errorHandler} = require('./middlewares/common/errorhandler');
const  userRoutes = require('./routes/userRoutes');
const  adminRoutes = require('./routes/adminRoutes');

const app = express();
dotenv.config();

//datatbase connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>console.log('database connection successful')).catch(err=>console.log(err));

//request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//parse cookies

//routing setup
app.use('/user',userRoutes);
app.use('/admin',adminRoutes)


//error handling
app.use(notFoundHandler);
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})