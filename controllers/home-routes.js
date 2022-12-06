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

// Update fav

router.put('/books/:id', async (req, res) => {
  // Where is this action method sending the data from the body of the fetch request? Why?
  // It is sending the data to the Model so that one dish can be updated with new data in the database.
  try {
    const book = await Books.update(
      {
        user_id: req.body.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // If the database is updated successfully, what happens to the updated data below?
    // The updated data (dish) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
