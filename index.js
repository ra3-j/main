const { MongoClient } = require("mongodb");
const connectionString = 'mongodb+srv://learnMongo:learnMongo123@cluster0.1poja.mongodb.net/testDB?retryWrites=true&w=majority';
MongoClient.connect(connectionString,async function(err,client){
    const db = client.db();
    // const results =  await db.collections("users").find().toArray();
    const results =  await db.collection("user").find().toArray();
    console.log(results);
    client.close();
});
