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

        let result1 = await client.db('ds_db').collection('almanac').aggregate([{$sample:{size:1}}]).toArray();
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

    leaderRouter.patch ("/changepassword", async (req, res) => {
    

        let findUser = await client.db('ds_db').collection('account').findOne({player:req.body.player});
    
        if (findUser) {
    
            if (bcrypt.compareSync(req.body.password, findUser.password) == true){ //compare the password with the hashed password in the database
            
            req.body.password = bcrypt.hashSync(req.body.newpassword, 10); //hash the new password
            await client.db('ds_db').collection('account').updateOne({player:req.body.player}, {$set: {password:req.body.password}}); //update the password in the database
            res.send('password changed successfully');
            }
    
            else { //password is incorrect
                res.status(401).send('password incorrect')
              }
    
        }
    
        else { //not found
    
            res.send('user not found')
      
          }
        
        });

    leaderboardRouter.delete('/delete', async(req, res) => {
        // First, find the user
           let user = await client.db("ds_db").collection("account").findOne({
                player: req.body.player
           });
   
       // If user doesn't exist, return an error
       if (!user) {
             return res.status(404).send('User not found');
       }

       else{
   
        // Check if the password is correct
       const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

       if (!isPasswordCorrect) {
            return res.status(403).send('Please insert correct playername and password');
       } 
       
       else{
       // If password is correct, delete the user
       let del= await client.db("ds_db").collection("account").deleteOne({
            player: req.body.player
  
       })
   
       res.send("Account Deleted Successfully");}}
   
   });
    
});
