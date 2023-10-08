import Posts from "../Models/Posts";
import Users from "../Models/Users";
import Comments from "../Models/Comments"
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
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
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    if (post.likedIds.includes(currentUserid)) {
      return res
        .status(400)
        .json({ error: "You have already liked this post." });
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
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Create a new comment for the reply
    const comment = new Comments({
      body,
      userId:currentUserid,
      postId:postId,
    });

    // Save the comment
    await comment.save();

    // Push the comment to the post's comments array
    post.comments.push(comment._id);

    // Save the updated post
    await post.save();

    return res.status(200).json({ message: "Reply added successfully." });
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
      const post = await Posts.findById(postId).populate('comments');
      console.log(post , `this main post`)
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  

      const comments = post.comments;
      // console.log(comments , `comments`)
  
      return res.status(200).json({ comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
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
};
