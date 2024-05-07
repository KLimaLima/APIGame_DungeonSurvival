const MongoClient = require('mongodb').MongoClient;

// Connect to the  URL
const url = 'URLit ';

const dbName = 'gameDatabase';

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }
  
  console.log('Connected successfully to server');
  
  const db = client.db(dbName);
  
  // Example of collection names 'players' and 'enemies'(for now)
  const playerCollection = db.collection('players');
  const enemyCollection = db.collection('enemies');
  
  // Fetching player data
  const getPlayerData = (username) => {
    playerCollection.findOne({ username }, (err, player) => {
      if (err) {
        console.error('Failed to fetch player data:', err);
        return;
      }
      
      if (!player) {
        console.log('Player not found');
        return;
      }
      
      // Display player data( no username)
      const { username, ...playerData } = player;
      console.log('• Player:', '..........');
      console.log('• Health pts:', playerData.healthPts);
      console.log('• Attack Action:', playerData.attackAction);
      console.log('• Magic Power:', playerData.magicPower);
      console.log('• Inventory:', playerData.inventory);
      
    
      getEnemyData();
    });
  };
  
  // enemy data
  const getEnemyData = () => {
    enemyCollection.findOne({}, (err, enemy) => {
      if (err) {
        console.error('Failed to fetch enemy data:', err);
        return;
      }
      
      if (!enemy) {
        console.log('Enemy not found');
        return;
      }
      
      console.log('• Enemy:', '..........');
      console.log('• Enemy Health:', enemy.health);
      console.log('• Enemy Next Move:', enemy.nextMove);
      
      client.close();
    });
  };
  
  // Player enters their username
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Enter your username: ', (username) => {
    getPlayerData(username);
    readline.close();
  });
});
