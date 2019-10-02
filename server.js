const express = require('express');
const app = express();
const db = require('./db');
const { Page } = db.models;

app.get('/api/pages', (req, res, next) => {
  Page.findAll({
      include: [Page]
    })
    .then(pages => res.send(pages))
    .catch(next);
});

app.get('/api/pages/:id/children', (req, res, next) => {
  Page.findByPk(req.params.id)
    .then(page => {
      page.findChildren()
        .then(children => res.send(children))
        .catch(next);
    })
    .catch(next);
});

app.get('/api/pages/:id/siblings', (req, res, next) => {
  Page.findByPk(req.params.id)
    .then(page => {
      page.findSiblings()
        .then(sibling => res.send(sibling))
        .catch(next);
    })
    .catch(next);
});

const port = process.env.PORT || 3000;

db.syncAndSeed()
.then(() => {
  app.listen(port, () => console.log(`listening on port ${port}`));
});
