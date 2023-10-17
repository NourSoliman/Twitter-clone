import Posts from "../Models/Posts";
import Users from "../Models/Users";
import Comments from "../Models/Comments"
import Notifications from '../Models/Notifications'
import { Request, Response } from "express";
const mongoose = require('mongoose');

//POST REQUEST TO CREATE POST
async function post(req: Request, res: Response) {
  try {
    const { body } = req.body;
    const { userId } = req.params;
    if (!body) {
      return res.status(400).json({ error: `You cant Post empty post!` });
    }
    const post = await Posts.create({
      body,
      userId,
    });
    await Users.findByIdAndUpdate(userId, { $push: { posts: post._id } });
    res.status(200).json({ message: `post created Successfully`, post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Etenral server Error` });
  }
}
//GET POSTS USiNG PAGINATED
async function getAllPosts(req: Request, res: Response) {
  try {
    const page = parseInt(req.params.page);
    const perPage = 10;
    const skip = (page - 1) * perPage;
    const posts = await Posts.find()
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .skip(skip)
      .limit(perPage);
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Etenral server Error` });
  }
}
async function getUserPosts(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const page = parseInt(req.params.page);
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const posts = await Posts.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Eternal Server error` });
  }
}
//GET POST SINGLE PAGE
async function GetPostSinglePage(req: Request, res: Response) {
  try {
    const { postId } = req.params;

    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(400).json({ error: `this post doesnt exist!` });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Enternal Server error` });
  }
}

async function likePost(req: Request, res: Response) {
  const { postId } = req.params;
  const currentUserid = req.user.userId;
  try {
    const post = await Posts.findById(postId);
    const postOwnerUserId = post.userId;
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    if (post.likedIds.includes(currentUserid)) {
      return res
        .status(400)
        .json({ error: "You have already liked this post." });
    }
    const userWhoLike = await Users.findById(currentUserid)
    const notification = new Notifications({
      type:`Like`,
      body:`${userWhoLike.firstName} liked your Tweet`,
      userId:postOwnerUserId,
      postId:postId,
      likedUserId:currentUserid,
    })
    await notification.save();
    const postOwnerUser = await Users.findById(postOwnerUserId);
    if (postOwnerUser) {
      postOwnerUser.hasNotification = true;
      await postOwnerUser.save();
    }

    post.likedIds.push(currentUserid);
    await post.save();
    const updatedPost = await Posts.findById(postId);

    return res
      .status(200)
      .json({ message: "Post liked successfully.", updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Enternal Server error` });
  }
}
//REMOVE LIKE 
async function unLikePost(req: Request, res: Response) {
  const { postId } = req.params;
  const currentUserid = req.user.userId;
  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    const index = post.likedIds.indexOf(currentUserid)
    if(index > -1) {
        post.likedIds.splice(index , 1);
    }
    await post.save();
    const updatedPost = await Posts.findById(postId);
    return res
      .status(200)
      .json({ message: "Post liked successfully.", updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Enternal Server error` });
  }
}

async function addReplyToPost(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const { body} = req.body;
    const currentUserid = req.user.userId;


    // Check if the post exists
    const post = await Posts.findById(postId);
    const postOwnerUserId = post.userId;

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Create a new comment for the reply
    const comment = new Comments({
      body,
      userId:currentUserid,
      postId:postId,
    });
    //notification
    const userWhoReply = await Users.findById(currentUserid)
    const notification = new Notifications({
      type:`Reply`,
      body:`${userWhoReply.firstName} replied to your Tweet`,
      userId:postOwnerUserId,
      postId:postId,
      likedUserId:currentUserid,
    })
    await notification.save();
    const postOwnerUser = await Users.findById(postOwnerUserId);
    if (postOwnerUser) {
      postOwnerUser.hasNotification = true;
      await postOwnerUser.save();
    }

    // Save the comment
    await comment.save();

    // Push the comment to the post's comments array
    post.comments.push(comment._id);

    // Save the updated post
    await post.save();

    return res.status(200).json({reply:comment , message: "Reply added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getReply(req: Request, res: Response){
    try {
      const { postId } = req.params;
  
      // Find the post by postId
      // const post = await Posts.findById(postId);
      const post = await Posts.findById(postId).populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } }, 
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  

      const comments = post.comments;
  
      return res.status(200).json({ comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
//get notifications
  async function getNotifications(req: Request, res: Response){
    try{
      const notifications = await Notifications.find({userId:req.user.userId}).sort({createdAt:-1}).populate(`postId`)
      const user = await Users.findById(req.user.userId);
      if (user) {
        user.hasNotification = false;
        await user.save();
      }
      // res.status(200).json(notifications)
      res.status(200).json({notifications : notifications})
    }catch(error){
      console.log(error)
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
//detele post
// DELETE a post
async function deletePost(req: Request, res: Response) {
  try {
    const userId = req.user.userId; 
    const { postId } = req.params;
    console.log(postId )
    
    if (!postId) {
      return res.status(400).json({ error: "Post ID is required." });
    }

    // Remove the post
    const deletedPost = await Posts.findByIdAndRemove(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Remove the post ID from the user's posts array
    await Users.findByIdAndUpdate(userId, { $pull: { posts: postId } });

    res.status(200).json({ message: "Post deleted successfully" , deletedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteReply(req: Request, res: Response) {
  try {
    const userId = req.user.userId;
    const { commentId , postId } = req.params; 


    if (!postId || !commentId) {
      return res.status(400).json({ error: "Post ID and Comment ID are required." });
    }

    const commentObjectId = new mongoose.Types.ObjectId(commentId);

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Check if the comment exists in the post's comments array
    const commentIndex = post.comments.findIndex((comment) => comment.equals(commentObjectId));

    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found in the post." });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    // Remove the comment from the Comments collection
    await Comments.findByIdAndRemove(commentObjectId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  post,
  getAllPosts,
  getUserPosts,
  GetPostSinglePage,
  likePost,
  unLikePost,
  addReplyToPost,
  getReply,
  getNotifications,
  deletePost,
  deleteReply,
};
