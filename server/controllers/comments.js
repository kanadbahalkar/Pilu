var Story = require('../models/story');
var Comments = require('../models/comment');

module.exports = {
    addNewComment: function (req, res, next) {
        //Create a new Comment instance
        var newComment = new Comments();
        newComment.userID = req.body.userID;
        newComment.storyID = req.body.storyID;
        newComment.commentText = req.body.commentText;
        newComment.save();

        // find by some conditions and update
        Story.findOneAndUpdate(
            { _id: req.body.storyID },
            { $push: { comments: newComment._id } },
            { safe: true, upsert: true },
            function (err, story) {
                console.log(newComment);
                if (err) {
                    res.status(401).send({
                        message: err,
                        status: "Error"
                    });
                }
                else {
                    res.status(200).send({
                        story: story,
                        status: "success"
                    });
                }
            }
        );
    },

    deleteAComment: function (req, res, next) {
        Comments.findOneAndRemove(req.body.commentID, function (err, comment) {
            if (err) {
                res.status(401).send({
                    message: err,
                    status: "Error"
                });
            }
            else {
                res.status(200).send({
                    removedComment: comment,
                    status: "success"
                });
            }
            return comment;
        });
    }
}
