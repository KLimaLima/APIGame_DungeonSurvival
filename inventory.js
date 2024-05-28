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
  const player = await db.collection('test1').findOne({playerId});


  if (!player) {
      throw new Error("Player not found");
  }

  return player;
}



// GET the players
InventoryRouter.get('/api/players/:playerId/inventory', async (req, res) => {
  const{playerId}=req.params;
  const player = await getPlayerById(playerId);
  if(player){
  const pipeline = [
    {
      '$match': {
        'playerId': playerId
      }
    }, 
    {
      '$project': {
        'inventory': 1
      }
    }
  ];

  const playerInventory = await db.collection('test1').aggregate(pipeline).toArray();
 
   
    res.status(200).json(playerInventory);
} 
else{
  res.status(400).send("Error")
}
});

//POST an item to a player's inventory
InventoryRouter.post('/api/players/:playerId/inventory', async (req, res) => {
const { playerId } = req.params;
const item = req.body.item;

  try {
    const player = await getPlayerById(playerId);

    const ItemAdd = await db.collection('test1').updateOne(
      { playerId: playerId },
      { $push: {inventory: 
        {item:item,
        attack: req.body.attack,
        defense: req.body.defense
         } }
        }
    );

    if (ItemAdd.modifiedCount === 0) {
      throw new Error("Couldn't add item to inventory");
    }

    res.status(200).json({ player, message: 'Item added to inventory' });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// //add item into the inventory
// async function addItemToPlayerInventory(playerId, item, attack, defense) {
//   try {
//     const player = await getPlayerById(playerId);

//     const ItemAdd = await db.collection('test1').updateOne(
//       { playerId: playerId },
//       { $push: {inventory: 
//         {item: item,
//         attack: attack,
//         defense: defense
//          } }
//         }
//     );

//     if (ItemAdd.modifiedCount === 0) {
//       throw new Error("Couldn't add item to inventory");
//     }

//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// }



// DELETE an item from a player's inventory
InventoryRouter.delete('/api/players/:playerId/inventory/:item', async (req, res) => {
  const { playerId, item } = req.params;

  try {
    const player = await getPlayerById(playerId);
    if (!player) {
      return res.status(404).send('Player not found');
    }


    const result = await db.collection('test1').updateOne(
      { playerId: playerId },
      { $pull: { inventory: { item: item } } }
    );

    if (result.modifiedCount === 0) {
      console.log('No modifications made by updateOne'); // Debugging line
      return res.status(404).send('Item not found');
    }

    res.send('Item removed from inventory');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});



//API start the game




//function return the randomized almanic

// function randomAlmanic(){

// functioon attack


//function health

//randomized attack 


