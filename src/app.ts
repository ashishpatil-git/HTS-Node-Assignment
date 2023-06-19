import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user.routes';
import config from './config/config';
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(router);

mongoose.connect(config.mongo.url, config.mongo.options as mongoose.ConnectOptions)
.then(()=>{
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Application Started on port ${port}`);
    });
})
.catch((err)=>{
    console.log(err.message);
});