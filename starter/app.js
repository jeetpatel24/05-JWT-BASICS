require('dotenv').config();    //to access evvironment variables
require('express-async-errors');

const express = require('express');
const app = express();

const mainRouter = require('./routes/main');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));  //to access front end files in 'public' folder
app.use(express.json());              //to access request body sent from front end

app.use('/api/v1', mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
