const express=require('express');
const app = express();
const bodyParser=require('body-parser');
// const port=process.env.PORT||3000;
const InventoryRouter=express.Router();
module.exports=InventoryRouter;


// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.static('public'));

// GET the players
InventoryRouter.get('/api/players/:playerId/inventory', async (req, res) => {
  const{playerId}=req.params;
  if (!ObjectId.isValid(playerId) ) {
    return res.status(400).send('Invalid ID format');
  }

  const player = await client.db('players').collection('player').findOne({ _id: new ObjectId(playerId) });
  if (!player) {
    return res.status(404).send('Player not found');
  }
  res.send(player.inventory);
});

// DELETE an item from a player's inventory
InventoryRouter.delete('/api/players/:playerId/inventory/:itemId', async (req, res) => {
  const { playerId, itemId } = req.params;
  if (!ObjectId.isValid(playerId) || !ObjectId.isValid(itemId)) {
    return res.status(400).send('Invalid ID format');
  }
  const player = await client.db('players').collection('player').findOne({ _id: new ObjectId(playerId) });
  if (!player) {
    return res.status(404).send('Player not found');
  }
  const item = await Inventory.findOne({ _id: ObjectId(itemId) });
  if (!item) {
    return res.status(404).send('Item not found');
  }
  player.inventory.remove(item);
  await player.save();
  res.send('Item removed from inventory');
});



// app.listen(port,()=>{
//     console.log(`Server listening at http://localhost:${port}`);
// });

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://ds_dev:ds_devgroupb@clusterds.imsywsc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDS";

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



