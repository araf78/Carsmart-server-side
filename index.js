const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


const uri = "mongodb+srv://dbuser1:xPRBgw44HXo5R9KL@cluster0.gh5ui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        await client.connect();
        const carItem = client.db("carsmart").collection("items");
    }
    finally {
        // await client.close()
    }
};

run().catch(console.dir);


// use middleware
app.use(cors())
app.use(express.json())

app.get('/',(req, res)=>{
    res.send('Running my side CRUD server');
})

app.listen(port, ()=>{
    console.log('CRUD server is running')
})