const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const { catchErrors } = require('../handlers/errorHandlers');


// Read
router.get('/', catchErrors(storeController.getStores));

router.get('/stores', catchErrors(storeController.getStores));

router.get('/stores/page/:page', 
    catchErrors(storeController.getStores)
);

router.get('/store/:id/edit', catchErrors(storeController.editStore));

router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/tags', catchErrors(storeController.getStoresByTag));

router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/hearts', 
    authController.isLoggedIn,
    catchErrors(storeController.getHearts)
);


// Create
router.get('/add', 
    authController.isLoggedIn,
    storeController.addStore
);

router.post('/add', 
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore)
);


// Update
router.post('/add/:id', 
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.updateStore)
);


// Login
router.get('/login', userController.loginForm);
router.post('/login', authController.login);


// Logout
router.get('/logout', authController.logout);


// Register
router.get('/register', userController.registerForm);

router.post('/register', 
    userController.validateRegister, 
    userController.register, 
    authController.login
);


// Account
router.get('/account', 
    authController.isLoggedIn,
    userController.account
);

router.post('/account', catchErrors(userController.updateAccount));

router.post('/account/forgot', catchErrors(authController.forgot));

router.get('/account/reset/:token', catchErrors(authController.reset));

router.post('/account/reset/:token',
    authController.confirmedPasswords,
    catchErrors(authController.update)
);


// Map
router.get('/map', storeController.mapPage);


// Reviews
router.post('/reviews/:id',
    authController.isLoggedIn,
    catchErrors(reviewController.addReview)
);

// Top
router.get('/top', catchErrors(storeController.getTopStores));


// API
router.get('/api/search', 
    catchErrors(storeController.searchStores)
);

router.get('/api/stores/near', 
    catchErrors(storeController.mapStores)
);

router.post('/api/stores/:id/heart', 
    catchErrors(storeController.heartStore)
);




module.exports = router;






// Examples from exercises 

// router.get('/', (req, res) => {
//   let me = { name: 'Matthew', age: 28, cool: true };
//   //res.send('Hey! It works!');
//   //res.json(me);
//   //res.send(req.query.name);
//   res.render('hello', {
//     name: 'Matthew',
//     age: 28,
//     cool: true,
//     title: 'Home'
//   });
// });

// router.get('/reverse/:name', (req, res) => {
//     //res.send('it works!');
//     //res.send(req.params.name);
//     let reverse = [...req.params.name].reverse().join('');
//     res.send(reverse);
// });
