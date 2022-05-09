const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


const uri = "mongodb+srv://dbuser1:xPRBgw44HXo5R9KL@cluster0.gh5ui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        await client.connect();
        const carCollection = client.db("carsmart").collection("items");
        const myItemCollection = client.db("carsmart").collection("myItems");


        // set data 
        app.get('/item', async (req, res)=>{
            const query = {};
            const cursor = carCollection.find(query);
            const items = await cursor.toArray();
            res.send(items)
        });

        // get data and  detail info 
        app.get('/item/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const item = await carCollection.findOne(query);
            res.send(item);
        }) 

        // add new item
        app.post('/item',async (req,res)=>{
            const newItem = req.body;
            console.log('add new item',newItem);
            const result = await carCollection.insertOne(newItem) 
            res.send(result)
          })

        //   delevery
        app.put('item/:id', async (req, res)=>{
            const id = req.params.id;
            const newQuantity = req.body; 
            const filter = {_id: ObjectId(id)};     
            const options = { upsert: true};
            const deleveryDoc = {
                $set :{
                    quantity: newQuantity.quantity
                }
            };
            const result = await carCollection.updateOne(filter, deleveryDoc, options)
            res.send(result);
        })

          // delete a user 
    app.delete('/item/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await carCollection.deleteOne(query);
        res.send(result)
      })

    //   post my item 
    app.post('/myItem',async (req,res)=>{
        const myItem = req.body;
        const result = await myItemCollection.insertOne(myItem) 
        res.send(result)
      })
      // my items 
      app.post('/myItem', async (req, res) => {
         const query = {};
         const cursor = myItemCollection.find(query);
         const myItems = await cursor.toArray();
          res.send(myItems);
      })
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