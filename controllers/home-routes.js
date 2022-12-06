const router = require('express').Router();
const { Books } = require('../models');

// GET all books for homepage
router.get('/', async (req, res) => {
  try {
    const dbBookData = await Books.findAll({
      // include: [
      //   {
      //     model: books,
      //     attributes: ['title', 'description'],
      //   },
      // ],
    });

    const books = dbBookData.map((book) =>
      book.get({ plain: true })
    );
    //Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('homepage', {
      books,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one books
router.get('/books/:id', async (req, res) => {
  try {
    const dbBookData = await Books.findByPk(req.params.id);

    const book = dbBookData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'gallery' template
    res.render('book', {book, loggedIn: req.session.loggedIn});   //loggedIn: req.session.loggedIn
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});


// User route
router.get('/user', (req, res) => {
 try { // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }} catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
