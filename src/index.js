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
const  categoryRoutes = require('./routes/categoryRoutes');
const  productRoutes = require('./routes/productRoutes');
const  cartRoutes = require('./routes/cartRoutes');

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
app.use('/category',categoryRoutes)
app.use('/product',productRoutes);
app.use('/cart',cartRoutes)


//error handling
app.use(notFoundHandler);
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})