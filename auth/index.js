import express from "express";
const app = express();
import authRoute from './routes/authRoute';


//middlware
app.use(express.json());

// test
app.get('/', function(req , res){
    res.json({
        msg : "Testing"
    })
})

// auth route
app.use('/api/auth' , authRoute);

app.listen(8800 ,()=>{
    console.log('Server is runnig at 8800');
})