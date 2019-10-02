const express = require('express');
const app = express();
const db = require('./db');
const { Page } = db.models;

app.get('/api/pages', (req, res, next) => {
  Page.findAll()
    .then(pages => res.send(pages))
    .catch(next);
});

const port = process.env.PORT || 3000;

db.syncAndSeed()
.then(() => {
  app.listen(port, () => console.log(`listening on port ${port}`));
});
