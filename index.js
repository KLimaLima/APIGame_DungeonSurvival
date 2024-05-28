const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

let client = require(`./database`)

const almanacRoute = require(`./almanic`)
const inventoryRoute = require(`./InvenTory`)

app.use(almanacRoute)
app.use(inventoryRoute)

app.get('/', (req, res) => {
   res.send('Hello World!')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

app.post('/set',async(req,res)=>{
  const{player}=req.body.player
let statPlayer = await client.db("ds_db").collection("test1").insertOne({
  playerId: req.body.player,
  inventory: [
    {
      item: 'light recover',
      attack: 10,
      defense: 5
    },
    {
      item: 'rage',
      attack:10,
      defense: 10
    }
  ],
  attack_action: 10,
  current_enemy: 'wolf',
  current_score: 0,
  enemy_health: 10,
  enemy_next_move: 'bite',
  evade_action: 5,
  health_pts: 10
});

res.send(statPlayer)

})



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   //  await client.close();
  }
}
run().catch(console.dir);