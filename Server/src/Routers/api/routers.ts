import express  from 'express'
const router = express.Router();
const usersController = require(`../../Controllers/userControllers`)
const postsController = require(`../../Controllers/postsController`)
import auth from '../../MiddleWares/auth'
require("dotenv").config();
router.get(`/register`, (req , res) => {
    res.send(`yea its register route`)
})
//LOGIN
router.post(`/register`, usersController.register)
router.post(`/login`,usersController.login)
router.get(`/allusers/:page`,usersController.getAllUsers)
router.get(`/user/:userId`,usersController.getUserData)
router.put(`/edit/:userId` , usersController.updateUserField)
router.post(`/follow/:userId` , auth, usersController.follow)
router.post(`/unfollow/:userId` , auth, usersController.unFollow)
//POSTS
router.post(`/post/:userId` , auth , postsController.post)
router.get(`/allposts/:page` , postsController.getAllPosts)
router.get(`/userposts/:userId/:page` , postsController.getUserPosts)
router.get(`/singlePost/:postId` , postsController.GetPostSinglePage)
router.post(`/likePost/:postId` , auth , postsController.likePost)
router.post(`/unlikePost/:postId` , auth , postsController.unLikePost)
router.post(`/reply/:postId` , auth , postsController.addReplyToPost)
router.get(`/posts/reply/:postId` , postsController.getReply)
router.get(`/notifications` , auth , postsController.getNotifications)
router.delete(`/deletePost/:postId` , auth , postsController.deletePost)
router.delete(`/deleteReply/:postId/:commentId` , auth , postsController.deleteReply)
module.exports = router;
