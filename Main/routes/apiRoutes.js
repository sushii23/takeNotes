const express = require('express');
const router = express.Router();
const store = require('../db/store');

router.route('/notes')
  .get((req, res) => {
    store.getNotes()
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  })
  .post((req, res) => {
    store.addNote(req.body)
      .then((note) => res.json(note))
      .catch((err) => res.status(500).json(err));
  })
  .delete('/:id', (req, res) => {
    store.removeNote(req.params.id)
      .then(() => res.json({ ok: true }))
      .catch((err) => res.status(500).json(err));
  });

module.exports = router;
