const path = require('path');
const PORT = process.env.PORT || 3000;
// using express as a server
const express = require('express');
const mongoose = require('mongoose');

// initializing express
const app = express();

// error controller
const errorController = require('./controllers/error');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// design file
app.use(express.static('public'));

// static file
app.set('view engine', 'ejs');
app.set('views', 'views');

// import routes
const index = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));


// use Routes
app.use(index);
app.use(errorController.get404);

//database
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gexk8id.mongodb.net/CSV?retryWrites=true&w=majority`
    
  )
  .then(() => console.log('database connected successfully'))
  .catch((err) => console.log('error connecting to mongodb', err));

// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
