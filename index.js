let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 2500;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.LiveMongo;
let cors = require('cors')
let bodyParser = require('body-parser')
let db;

//middlewear
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())


app.get('/',(req,res) => {
    res.send('hi from experss')
})

//list of categories
app.get('/category',(req,res) => {
    db.collection('category').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/Allproduct',(req,res)=>{
    db.collection('shopcat').find().toArray((err, result)=>{
        if (err) throw err;
        res.send(result)
    })
  })

//list of jewellery with respect to Categories
app.get('/product',(req,res) =>{
    let productId = Number(req.query.productId)
    let query = {}
    if(productId){
        query = {product_id:productId}
    }else{
        query = {}
    }
    db.collection('product').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


app.get('/product',(req,res)=>{
    let productId = Number(req.query.productId);
    let categoryId = Number(req.query.categoryId)
    let query = {}
    if(stateId){
        query = {state_id:stateId}
    }else if(categoryId){
        query = {"jewelleryTypes.category_id":categoryId}
    }else{
        query = {}
    }
    db.collection('product').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//page2
// app.get('/filter/:categoryId',(req,res) => {
//     let query = {};
//     let sort = {price:1}
//     let categoryId = Number(req.params.categoryId);
//     let productId = Number(req.query.productId);
//     let lcost = Number(req.query.lcost);
//     let hcost = Number(req.query.hcost);

//     if(req.query.sort){
//         sort={price:req.query.sort}
//     }

//     if(hcost && lcost && categoryId){
//         query={
//             "jewelleryTypes.category_id":categoryId,
//             $and:[{cost:{$gt:lcost,$lt:hcost}}]
//         }
//     }
//     else if(hcost && lcost){
//         query={
//             "jewelleryTypes.category_id":categoryId,
//             $and:[{cost:{$gt:lcost,$lt:hcost}}]
//         }
//     }
//     else if(productId){
//         query={
//             "jewelleryTypes.category_id":categoryId,
//             "products.product_id":productId
//         }
//     }else{
//         query={
//             "jewelleryTypes.category_id":categoryId
//         }
//     }
//     db.collection('jewellery').find(query).sort(sort).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })

app.get("/filter/:productId", (req, res) => {
    let productId = Number(req.params.productId);
    let sort = {cost:1}
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let categoryId = Number(req.query.categoryId);
    let query = {};
  
    if(req.query.sort){
        sort={cost:req.query.sort}
    }

    if (categoryId && lcost && hcost) {
      query = {
        product_id: productId,
        category_id: categoryId,
        $and: [{product_price: { $gt: lcost, $lt: hcost } }],
      };
    } else if (lcost && hcost) {
      query = {
        product_id: productId,
        $and: [{ product_price: { $gt: lcost, $lt: hcost } }],
      };
    }
    else if (categoryId) {
      query = {
        product_id: productId,
        category_id: categoryId,
      };
    } else {
      query = {
        product_id: productId,
      };
    }
    db.collection("product")
      .find(query)
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
  });

// list of jewellery
app.get('/jewellery',(req,res)=>{
    db.collection('jewellery').find().sort(sort).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//page3
app.get('/details/:proId',(req,res)=>{
    let proId = Number(req.params.proId)
    db.collection('product').find({category_id:proId}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//placeorder
// app.post('/productItem',(req,res) => {
//     if(Array.isArray(req.body.id)){
//         db.collection('product').find({product_id:{$in:req.body.id}}).toArray((err,result) => {
//             if(err) throw err;
//             res.send(result)
//         })
//     }else{
//         res.send('Invalid Input')
//     }
    
// })

//placeorder
app.post('/placeOrder',(req,res) => {
    db.collection('order').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Order Placed')
    })
})

// order
app.get('/orders',(req,res)=>{
    let email = req.query.email;
    let query = {}
    if(email){
        query={email}
    }else{
        query={}
    }
    db.collection('order').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//updateOrder
app.put('/updateOrder/:id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('order').updateOne(
        {order_id:oid},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date
            }
        },(err,result) => {
            if(err) throw err;
            res.send('Order Updated')
        }
    )
})

//deleteOrder
app.delete('/deleteOrder/:id',(req,res) => {
    let _id = mongo.ObjectId(req.params.id);
    db.collection('order').remove({_id},(err,result) => {
        if(err) throw err;
        res.send('Order Deleted')
    })
})

//connection with db
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while Connecting');
    db = client.db('jalpaproj');
    app.listen(port,() =>{
        console.log(`Server is running on port ${port}`)
    }
    )
}
)

