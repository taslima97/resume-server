const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



console.log(process.env.DB_PASS)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p54mfnr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const toysCollection = client.db('SportsToy').collection('toys')

    app.get('/alltab/:text', async(req, res)=>{
        console.log(req.params.text)
        if(req.params.text == 'Single Sports' || req.params.text == 'Group Sports' || req.params.text == 'Combat Sports'){
            const result = await toysCollection.find({category: req.params.text}).toArray();
           return res.send(result)
        }
        const result = await toysCollection.find({}).toArray();
        res.send(result)
    });


    app.get('/alltab/text/:id',async(req, res)=>{
const id = req.params.id;
const query = {_id: new ObjectId(id)}
const result = await toysCollection.findOne(query);
res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res)=>{
    res.send('sports is running')
});


app.listen(port, ()=>{
    console.log(`sports server API:${port}`)
})