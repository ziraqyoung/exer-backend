const router = require('express').Router();
const User = require('../models/userModel');

router.route('/').get((req, res) => {
  res.send("Hello World");
});
/**
 * User Routes
 */
// POST /api/exercise/new_user
router.route('/new_user').post((req, res) => {
  const { username } = req.body;
  const newUser = new User({
    username
  });
  newUser.save()
    .then(() => res.json('User Added!'))
    .catch(err => res.status(400).json('Error:' + err));
});
/**
 * Exercise Routes
 */
// POST /api/exercise/add
router.route('/add').post((req, res) => {
  const userId = req.body.userId;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  User.findById(userId)
    .exec()
    .then((doc) => {
      doc.children.push({
        userId, description, duration, date
      });
      doc.save()
        .then(() => res.json(doc))
        .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
// api/exercise/log?userId=12456&from=DATE&to=DATE&limit=10
router.route('/log/').get((req, res) => {

  const userId = req.query.userId;
  const limit = Number(req.query.limit);
  const from = Date.parse(req.query.from);
  const to = Date.parse(req.query.to);

  if (!userId) { res.status(400).json({ error: 'Please provide a valid username' }) };

  User.findById(userId)
    .exec()
    .then((doc) => {
      if (from && to) {
        let query = {
          date: { $gt: from, $lt: to }
        }
        let subdoc = doc.children;
        res.json(subdoc)
      } else {
        res.json(doc);
      }
    })
    .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;
