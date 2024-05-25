const bcrypt = require('bcrypt')
const express = require('express');
const leaderboardRouter=express.Router();
module.exports=leaderboardRouter;


//app.use(express.json());


leaderboardRouter.get('/leaderboard', async(req, res) => {
    let LatestLB = await client.db("da_db").collection("account")
        .find()
        .sort({ score: -1 }) // Sort by score in descending order
        .toArray();

    res.json(LatestLB);
});
leaderboardRouter.post('/register',async(req,res)=>{
    let Exists= await client.db("ds_db").collection("account").findOne({
        player:req.body.player
    });
    if(Exists){
        res.status(404).send("Player already exists");
    }
    else{
        const hash = bcrypt.hashSync(req.body.password, 10);
        let result= await client.db("ds_db").collection("account").insertOne({
            player:req.body.player,
            password:hash
        });
        let document = result1[0]; // get the first document from the result array
        let skills = document.skill;

        // Generate a random index
        let randomIndex = Math.floor(Math.random() * skills.length);

        // Get a random skill
        let randomSkill = skills[randomIndex];


        

        let statPlayer= await client.db("ds_db").collection("stat").insertOne({
            playerID:req.body.player,
            inventory:0,
            attack_action:10,
            current_enemy:document.enemy,
            current_score:0,
            enemy_health:document.base_health,
            enemy_next_move:randomSkill.attack_name,
            evade_acrion:5,
            heath_pts:10
      
       })
    res.send({message:"Account created successfully, please remember your player id"});
})
leaderboardRouter.post('/forgetuserID', async(req, res) => {
    let result = await client.db("ds_db").collection("account").findOne({
        player: req.body.player,
        password: req.body.password
    })
    if(!req.body.username || !req.body.password){
        res.status(404).send('Please provide username and password')
      }
      else if(req.body.player != null && req.body.password != null){
      
        if(result){
          //step2:if user exists, check if password is correct
          if(bcrypt.compareSync(req.body.password,result.password)==true){
            //paaword is correct
            res.send(result._id);
          } else{
            //password is incorrect
            res.status(404).send('Wrong Password');
          
          }
        }else{
          //step3:if user not found
          res.send('User not found');
        
        }
    }
    
});
