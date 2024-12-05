// REST API = set of rules and conventions for building and interacting with web services
// Client server architecture , Respect all http methods (we should use http methods based on the use case)
//  POST = we are creating some new resource
// PUT = we have to update/make changes in existing resource
const express = require('express');
const app = express();
const PORT = 3000;
const users = require('./MOCK_DATA (2).json');
app.use(express.json());
// test route
app.get('/', function(req ,res) {
    res.send(`<h1>Welcome to Homepage</h1>`)
})

// server side rendering 
app.get('/users' , function(req , res){
    const htmlDocument =
    `
    <ul>
    ${users.map((user)=>
        `<li>${user.first_name}</li>`
        ).join('')}
    </ul>
    `
    res.send(htmlDocument);
})

// api for raw data
app.get('/api/users' , function(req, res){
    res.json(users);
})


// api for getting a user with id
app.get('/api/users/:id', function(req , res){
    const id =  Number(req.params.id);
    console.log(id);
    if(id > users.length){
        // does not exist
        res.json({
            msg : "User does not exist"
        })
    }
    let person;
    for(let i =0 ; i<users.length ; i++){
        if(users[i].id  === id){
            person = users[i];
            break; 
        }
    }
    res.json(person);
})

// api to add a new user 
app.post('/api/users' , function(req ,res){
    const data = req.body;
    const newMember = {
        id : users.length+1,
        ...data
    }
    users.push(newMember);
    res.send(newMember);
    // console.log(data);
})

// update the name of a user 
app.put('/api/users/:id' , function(req , res){
    const id = Number(req.params.id);
    const new_name = req.body.first_name;
    console.log(typeof(new_name));
    if(id >  users.length){
        res.json({
            msg : "User doesn't exist"
        })
    }
    users[id].first_name = new_name;
    res.json(users[id]);
})

// to delte a user 

app.listen(PORT, function(){
    console.log(`Server is running at ${PORT}`)
})



