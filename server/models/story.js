'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Comments = require('../models/comment').Comments;

// Story Schema
const StorySchema = new Schema({
    userID: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    public: {
        type: Boolean
    },
    reactions: [{
        userID: { type: String },
        reactionOn: { type: Date },
        reactionType: {
            type: String,
            enum: ['like', 'lulz', 'meh']
        }, 
    }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    searchTags: [{ 
        type: String 
    }],
    hashtags: [{ 
        type: String 
    }],
    location: { 
        type: String 
    },
    curation: {
        trending: { type: Boolean },
        editorsChoice: { type: Boolean },
        editorsChoiceOn: { type: Date }
    },
    flaggedCount: {
        type: Number
    },
    flag: {
        type: String,
        enum: ['violence', 'racist', 'hateful', 'profane']
    },    
},
{
    timestamps: true
});

//Static method to get public stories
StorySchema.statics.getPublicStories = function(filter, cb) {
    return this.find({ public: true }).populate('comments').sort({'createdAt': -1}).exec(cb);
}

//Static method to get user stories
StorySchema.statics.getUserStories = function(userid, cb) {
    return this.find({ userID: userid }).populate('comments').sort({'createdAt': -1}).exec(cb);
}

StorySchema.methods.searchStories = () => {
    Story.find({}, function (err, users) {
        if (err) return next(err);
        let usersList = [];
        users.map(user => usersList.push(user));
        return usersList;
    })
}

StorySchema.methods.discoverStories = () => {
    Story.find({}, function (err, users) {
        if (err) return next(err);
        let usersList = [];
        users.map(user => usersList.push(user));
        return usersList;
    })
}

module.exports = mongoose.model('Story', StorySchema);
