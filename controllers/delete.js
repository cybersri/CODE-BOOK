const organizationModel = require('../models/Organization.model')
const userModel = require('../models/User.model');
const postModel = require('../models/Post.model');
const postUpvoteModel = require ('../models/UpVote');
const commentModel = require('../models/Comment.model');
const suggestionModel = require('../models/Suggestion.model');
const suggestionUpvoteModel = require('../models/suggestionUpVote');

exports.deleteUser=async(user)=>{
    try {
        await suggestionUpvoteModel.deleteMany({userID:user._id});
        await suggestionModel.deleteMany({user});
        await commentModel.deleteMany({user});
        await postUpvoteModel.deleteMany({userID:user._id});
        await postModel.deleteMany({user});
        await userModel.deleteOne({_id:user});
        return {status:true}
        
    } catch (err) {
        console.log(err)
        return {status:false, err}
    }
}

exports.deleteOrganization = async(organization)=>{
    try {
        const users = await userModel.find({organization});
        for(let i = 0; i<users.length;i++){
            const user = users[i]
            console.log(1)
            await suggestionUpvoteModel.deleteMany({userID:user._id});
            await suggestionModel.deleteMany({user});
            await commentModel.deleteMany({user});
            await postUpvoteModel.deleteMany({userID:user._id});
            await postModel.deleteMany({user});
            await userModel.deleteOne({_id:user});
        }

        console.log('complete')
        // await suggestionUpvoteModel.deleteMany({userID:{$in:[users]}});
        // await suggestionModel.deleteMany({user:{$in:[users]}});
        // await commentModel.deleteMany({user:{$in:[users]}})
        // await postUpvoteModel.deleteMany({userID:{$in:[users]}})
        // // await postModel.deleteMany({user:{$in:[users]}})
        // await postModel.deleteMany({organization})
        // await userModel.deleteMany({_id:{$in:[users]}})
        await organizationModel.deleteOne({_id:organization})
        return {status:true}
    } catch (err) {
        console.log(err)
        return {status:false, err}
    }
}