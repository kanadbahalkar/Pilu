const express = require('express'),
    passport = require('passport'),
    path = require('path'),
    loginController = require('./controllers/login'),
    commentsController = require('./controllers/comments'),
    storiesController = require('./controllers/stories'),
    profileController = require('./controllers/profile');

// Middleware to require login/auth
//var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app, io) {

    app.use((req, res, next) => {
        res.io = io;
        next();
    });

    // Initializing route groups
    const apiRoutes = express.Router(),
    loginRoutes = express.Router(),
    storyRoutes = express.Router(),
    commentRoutes = express.Router(),
    profileRoutes = express.Router();

    ////// Login Routes
    //Set auth routes as subgroup/middleware to apiRoutes
    // apiRoutes.use('/auth', loginRoutes);
    // // Registration route
    // loginRoutes.post('/register', loginController.register);
    // // Login route
    // loginRoutes.use('/login', loginController.login);
    // // Check if user is already Logged In 
    // loginRoutes.post('/checklogin', loginController.checkLogin);
    // // route for logging out
    // loginRoutes.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/login');
    // });

    ////// Story Routes
    apiRoutes.use('/stories', storyRoutes);
    //Get stories for users who are not logged in
    storyRoutes.get('/public', storiesController.getPublicStories);
    //Get stories for users who are logged in
    storyRoutes.post('/mystories', storiesController.getUserStories);
    //Update a story
    storyRoutes.post('/update', storiesController.updateAStory);
    //Delete a story
    storyRoutes.delete('/delete', storiesController.deleteAStory);
    // //Create a story
    storyRoutes.post('/new', storiesController.addNewStory);
    
    //// Comment Routes
    apiRoutes.use('/comments', commentRoutes);
    //Write new comment 
    commentRoutes.post('/new', commentsController.addNewComment);
    //Delete a comment
    commentRoutes.delete('/delete', commentsController.deleteAComment);

    ////// Profile Routes
    // apiRoutes.use('/profile', profileRoutes);
    // //Get user profile 
    // profileRoutes.get('/', profileController.getUserProfile);
    // //Update user profile
    // profileRoutes.post('/', profileController.updateUserProfile);

    // Set url for API group routes
    app.use('/api', apiRoutes);

    //Serving Angular content 
    app.use(express.static(path.join(__dirname, '/public/app')));
    app.use('/bower_components', express.static(path.join(__dirname, '/public/bower_components')));
    app.all('/*', function(req, res, next) {
        res.sendFile(path.join(__dirname, '/public'));
    });
};
