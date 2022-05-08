const express = require('express');
const app = express();
app.use(express.json());
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://learnMongo:learnMongo123@cluster0.1poja.mongodb.net/testDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const ObjectId = require('mongodb').ObjectId;

app.post('/api/Add',(req,res)=>{   
    client.connect(async err => {
    const collection = client.db().collection("user");
    await collection.insertOne(req.body,(error,result)=>{
        if (error) {
            throw error;
        }
        res.send(result.insertedId);
    });
    client.close();
});
});

app.put('/api/Update',(req,res)=>{   
    client.connect(async err => {
    const collection = client.db().collection("user");
    await collection.updateOne({ _id: req.body._id },{
        $set: req.body
      },(error,result)=>{
        if (error) {
            throw error;
        }
        res.send(req.body);
    });
    client.close();
});
});

app.delete('/api/Delete/:id',(req,res)=>{   
    client.connect(async err => {
    const collection = client.db().collection("user");
    await collection.deleteOne({ _id: req.params.id },(error,result)=>{
        if (error) {
            throw error;
        }
        res.send('user deleted successfully!');
    });
    client.close();
});
});

app.get('/api/getInfo/:id',(req,res)=>{   
    client.connect(async err => {
    const collection = client.db().collection("user");
    await collection.find({_id: ObjectId(req.params.id)}).toArray((error, documents) => {
            if (error) {
                throw error;
            }
            let toDoInfo = [];
            for(let toDo of documents[0].todo){
                toDoInfo.push(toDo.desc);
            }
            res.send(toDoInfo);
        });
    client.close();
});
});

app.get('/api/getAll/:id',(req,res)=>{   
    client.connect(async err => {
    const collection = client.db().collection("user");
    await collection.find({_id: ObjectId(req.params.id)}).toArray((error, documents) => {
            if (error) {
                throw error;
            }
            res.send(documents[0].todo);
        });
    client.close();
});
});

app.listen(3000,()=>{
    console.log('started');
})