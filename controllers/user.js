const postModel = require('../models/Post.model');
const userModel = require('../models/User.model');
// const organizationModel = require('../models/Organization.model')

exports.getUserPost = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await userModel.findOne({ email });
        const posts = await postModel.find({ userID: user._id });
        res.status(202).json({
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            posts
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Internal problem',
            err: err.message
        });
    }
}

exports.pendingActivationRequest= async(req, res)=>{
    try{
        if(req.isOrg){
            const users = await userModel.find({organization:req.user._id, status:2});
            return res.status(200).json({
                users
            })
        }
        else{
            return res.status(401).json({
                msg:'unable to process request'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            msg:'something went wrong',
            err:err
        })
    }
}

exports.setStatus = async(req,res) =>{
    try{
        const { userId, action } = req.body;
        const code = (action==='activate')?1:
                        (action==='de-activate')?2:2
        if(req.isOrg){
            const user = await userModel.findOneAndUpdate({_id:userId, organization:req.user._id},{status:code});
            if(!user){
                return res.status(401).json({
                    msg:"cannot find user"
                })
            }
            return res.status(200).json({
                msg:(action==='activate'?'account activated':'account de-activated'),
                user:user.email
            })
        }
        else{
            return res.status(401).json({
                msg:'unable to process request'
            })
        }
    }
    catch(err){
        return res.status(401).json({
            msg:'something went wrong'
        })
    }
}

exports.deleteUser= async(req,res)=>{
    try{
        const userId = req.params.id
        if(req.isOrg){
            const user = await userModel.findOneAndDelete({_id:userId, organization:req.user._id});
            if(!user){
                return res.status(401).json({
                    msg:"cannot find user"
                })
            }
            return res.status(200).json({
                msg:"user deleted"
            })
        }
        else{
            return res.status(401).json({
                msg:'unable to process request'
            })
        }
    }
    catch(err){
        return res.status(401).json({
            msg:'something went wrong'
        })
    }
}