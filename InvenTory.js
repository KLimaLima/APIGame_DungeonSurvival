const express=require('express');
const app = express();
const port=process.env.PORT||3000;


app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

// GET the players
app.get('/api/players/:playerId/inventory', async (req, res) => {
  const player = await client.db('players').collection('player').findById(req.params.playerId);
  if (!player) {
    return res.status(404).send('Player not found');
  }
  res.send(player.inventory);
});

// DELETE an item from a player's inventory
app.delete('/api/players/:playerId/inventory/:itemId', async (req, res) => {
  const { playerId, itemId } = req.params;
  const player = await client.db('players').collection('player').findById(req.params.playerId);
  if (!player) {
    return res.status(404).send('Player not found');
  }
  const item = await Inventory.findById(itemId);
  if (!item) {
    return res.status(404).send('Item not found');
  }
  player.inventory.remove(item);
  await player.save();
  res.send('Item removed from inventory');
});



app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
});




