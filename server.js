const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

const userRouter = require('./routes/user.js');
const contestRouter = require('./routes/contest.js');

app.use('/user',userRouter);
app.use('/contest',contestRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

