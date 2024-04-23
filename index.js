const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://thunderblitz18:emtbestwaifu@cluster0.ki0j8rb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

console.log('successfully connected to MONGODB');



app.get('/Almanac', async (req, res) => {

    let enemies = await client.db('Almanac').collection('enemy_info').find().toArray();

    res.send(enemies);

})





app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});