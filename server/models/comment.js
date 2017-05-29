'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Comments Schema
const CommentSchema = new Schema({
    userID: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    storyID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Story' 
    },
    commentText: {
        type: String,
        required: true
    },
    flaggedCount: {
        type: Number
    },
    flag: {
        type: String,
        enum: ['violent', 'racist', 'hateful', 'profane']
    },    
},
{
    timestamps: true
});

CommentSchema.statics.getComments = function(storyid, cb) {
    return this.find({ storyID: storyid }).sort({'date': -1}).exec(cb);
}

module.exports = mongoose.model('Comments', CommentSchema);