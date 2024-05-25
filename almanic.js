const express = require('express');
const app = express();
const AlmanacRouter = express.Router();
module.exports = AlmanacRouter;




AlmanacRouter.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://thunderblitz18:emtbestwaifu@cluster0.ki0j8rb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



AlmanacRouter.get('/Almanac', async (req, res) => {
    let enemies = await client.db('Almanac').collection('enemy_info').aggregate([
        { "$sort": { "enemy": {$max:"999999"} } }
    ]).toArray();

    res.send(enemies);
});





// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });

