const express = require('express');
const app = express();
const PORT = 3000

// test route
app.get('/api/test' , function(req , res){
    const n = req.query.n;
    console.log(n);
    res.json({
        msg : "Value Printed"
    })
})
app.listen(PORT, function(){
    console.log(`Server is running at ${PORT}`)
})