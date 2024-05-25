const express=require('express');
const InventoryRouter=express.Router();
module.exports=InventoryRouter;
const client = require('./database')
const db = client.db('ds_db');


// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.static('public'));

//function to determine whether the player exists
const getPlayerById = async (playerId) => {
  if (!playerId) {
      throw new Error("Invalid ID format");
  }

  // const client = require('./database')
  // const db = client.db('ds_db');
  const player = await db.collection('stats').findOne({playerId});

  if (!player) {
      throw new Error("Player not found");
  }

  return player;
}



// GET the players
InventoryRouter.get('/api/players/:playerId/inventory', async (req, res) => {
  try{
  const{playerId}=req.params;
 
    const player = await getPlayerById(playerId);
    res.status(200).json(player);
} catch (error) {
    res.status(400).send(error.message);
}
});

//POST an item to a player's inventory
InventoryRouter.post('/api/players/:playerId/inventory', async (req, res) => {
  try{
    const{playerId}=req.params;
    const player = await getPlayerById(playerId);
    res.status(200).json(player);
} catch (error) {
    res.status(400).send(error.message);
}
const item=req.body.item;
const ItemAdd = await db.collection('tests').updateOne(
  {playerId:req.params},
  { $push: { inventory: item } }
);

if (ItemAdd.modifiedCount === 0) {
  throw new Error("Couldn't add item to inventory");
}

res.status(200).send('Item added to inventory');

});


// DELETE an item from a player's inventory
InventoryRouter.delete('/api/players/:playerId/inventory/:itemId', async (req, res) => {
  const { playerId, itemId } = req.params;
  if (!ObjectId.isValid(playerId) || !ObjectId.isValid(itemId)) {
    return res.status(400).send('Invalid ID format');
  }
  const player = await client.db('players').collection('player').findOne({ _id: playerId });
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

//API start the game




//function return the randomized almanic

// function randomAlmanic(){

// functioon attack


//function health

//randomized attack 


