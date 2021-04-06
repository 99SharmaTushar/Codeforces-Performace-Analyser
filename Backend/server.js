const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

const userRouter = require('./routes/user.js');
const contestRouter = require('./routes/contest.js');

app.use('/user',userRouter);
app.use('/contest',contestRouter);

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});

