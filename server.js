const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;
const MONGO_URI = 'mongodb+srv://siddiqahmed882:9n9Xj65asmfHNIJi@todo-app.wiah2qi.mongodb.net/';

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// log the request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/tasks', require('./routes/tasks.routes.js'));

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log(err));
