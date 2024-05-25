const express = require('express');
const AlmanacRouter = express.Router();
module.exports = AlmanacRouter;

let client = require(`./database.js`)

AlmanacRouter.get('/almanac', async (req, res) => {

    let enemies = await client.db('ds_db').collection('almanac').find().toArray();

    res.send(enemies);

})


AlmanacRouter.get ("/randomize", async (req, res) => {

    let result = await client.db('ds_db').collection('almanac').aggregate([{$sample:{size:1}}]).toArray();
    
    res.send(result)
    
    })
