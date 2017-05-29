var User = require('../models/user');
var Stories = require('../models/story');
var Comments = require('../models/comment');

module.exports = {
    getPublicStories: function (req, res, next) {
        let publicStories = Stories.getPublicStories('Public', function (err, stories) {
            res.status(200).send({
                publicStories: stories,
                status: "success"
            });
            return stories;
        });
    },

    getUserStories: function (req, res, next) {
        let userStories = Stories.getUserStories(req.body.userID, function (err, stories) {
            res.status(200).send({
                userStories: stories,
                status: "success"
            });
            return stories;
        });
    },

    addNewStory: function (req, res, next) {
        //Create a new instance for Story
        var newStory = new Stories();
        newStory.userID = req.body.userID;
        newStory.imageUrl = req.body.imageUrl;
        newStory.description = req.body.description;
        newStory.location = req.body.location;
        newStory.public = req.body.public;
        newStory.curation.trending = req.body.trending;
        newStory.curation.editorsChoice = req.body.editorsChoice;
        newStory.curation.editorsChoiceOn = Date.now();
        newStory.save();

        res.status(200).send({
            newStory: newStory,
            status: "success"
        });
    },

    updateAStory: function (req, res, next) {
        Stories.findById(req.body.storyID, function (err, story) {
            if (err) {
                res.status(401).send({
                    message: err,
                    status: "Error"
                });
            }

            story.description = req.body.description;
            story.location = req.body.location;
            story.save(function () {
                res.status(200).send({
                    updatedStory: story,
                    status: "success"
                });
            });
            return story;
        });
    },

    deleteAStory: function (req, res, next) {
        Stories.findOneAndRemove(req.body.storyID, function (err, story) {
            if (err) {
                res.status(401).send({
                    message: err,
                    status: "Error"
                });
            }
            else {
                res.status(200).send({
                    removedStory: story,
                    status: "success"
                });
            }
            return story;
        });
    }
}
