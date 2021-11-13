import express, { Request, Response, NextFunction } from 'express';
import moongoose from 'moongoose';
import axios from 'axios'
import CoinModel from './models/coin';
const app = express();
const port = 3000;
moongoose.connect("mongodb://localhost:27017/myapp").then(()=>{
console.log('connected');
}).catch(err=>{
    console.log(err);
})
app.get('/',(req:Request,res:Response)=>{
    axios.get('https://api.coingecko.com/api/v3/coins/list').then((result) => {
          
          CoinModel.insertMany(result.data).then(coins=>{
            console.log('hello there',coins[0]);

            res.send({status:true,message:"The Coins are added to db"})
                   }).catch(err=>{
                    res.send({status:false,message:"Error saving coins in db",error:err.message})
                  })
        // Do stuff with response
      });
})
app.get('/listCoin',(req:Request,res:Response)=>{
 CoinModel.find().then(result=>{
                console.log(result)
                res.send(result);
            }).catch(err=>{
                console.log(err);
            })
})
app.listen(port,async () => {
  
  console.log(`your application is running on port ${port}.`);
});