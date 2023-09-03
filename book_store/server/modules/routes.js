const router = require('express').Router();
const User = require('./users');
const Library = require('./libraries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    const library = new Library({
        userId: user._id,
        library: []
    });

    const result = await user.save();
    await library.save();

    const {password, ...data} = await result.toJSON();

    res.send(data);


})

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }

    const token = jwt.sign({_id: user._id}, "secret")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send({
        message: 'success'
    })
})

router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user = await User.findOne({_id: claims._id})

        const {password, ...data} = await user.toJSON()

        res.send(data)
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
})

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'success'
    })
})

router.post('/addBook', async (req, res) => {
    try {
        const userLibrary = await Library.findOne({ userId: req.body.userId });
        
        if (!userLibrary) {
            return res.status(404).json({ error: 'User library not found' });
        }

        const books = req.body.books;
        const uniqueBooks = removeDuplicates(userLibrary.library, books);
        userLibrary.library = userLibrary.library.concat(uniqueBooks);

        await userLibrary.save();

        const { library, ...data } = await userLibrary.toJSON();
        res.send(data);
    } catch (error) {
        // Handle errors, e.g., validation errors or database errors
        res.status(400).json({ error: error.message });
    }
});

// Helper function to remove duplicates from an array of objects based on a specific property
function removeDuplicates(existingLibrary, booksToAdd) {
    const uniqueBooksToAdd = [];
    const existingBookIds = new Set(existingLibrary.map(book => book["_id"]));

    for (const book of booksToAdd) {
        if (!existingBookIds.has(book["_id"])) {
            uniqueBooksToAdd.push(book);
        }
    }
    
    return uniqueBooksToAdd;
}

router.get('/library', async (req, res) => {
    try {
        const userId = req.query.userId; // Extract userId from query parameters
        const userLibrary = await Library.findOne({ userId });

        const {library, ...data} = await userLibrary.toJSON()

        res.send(library)
    } catch (e) {
        console.error("Error: ", e);
        return res.status(500).send({
          message: 'Error in get library',
        });
    }
})

module.exports = router;



