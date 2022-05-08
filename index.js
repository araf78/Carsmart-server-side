const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


const uri = "mongodb+srv://dbuser1:xPRBgw44HXo5R9KL@cluster0.gh5ui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        await client.connect();
        const carItem = client.db("carsmart").collection("items");

        // set data 
        app.get('/item', async (req, res)=>{
            const query = {};
            const cursor = carItem.find(query);
            const items = await cursor.toArray();
            res.send(items)
        });

          // delete a user 
    app.delete('/item/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await carItem.deleteOne(query);
        res.send(result)
      })

        // post data
        // app.post('/user',async (req,res)=>{
        //     const newItem = req.body;
        //     console.log('add new user',newItem);
        //     const result = await userCollection.insertOne(newItem) 
        //     res.send(result)
        //   })
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