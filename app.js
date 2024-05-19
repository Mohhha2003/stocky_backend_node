const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const cartRouter = require('./routes/cartRoutes');
const userRouter = require('./routes/userRoutes');
const homeRouter = require('./routes/homeRoutes');
const favouriteRouter = require('./routes/favouriteRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cartRouter);
app.use(userRouter);
app.use(homeRouter);
app.use(favouriteRouter);


module.exports = app;