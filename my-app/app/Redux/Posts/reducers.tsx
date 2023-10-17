import {
    ADD_POST_FIRST, ADD_POST_SUCCESS, ADD_POST_FAIL,
    GET_POST_FIRST, GET_POST_FAIL, GET_POST_SUCCESS, GET_USER_POSTS_FAIL, GET_USER_POSTS_FIRST,
    GET_USER_POSTS_SUCCESS, GET_USER_SINGLE_PAGE_FAIL, GET_USER_SINGLE_PAGE_FIRST,
    GET_USER_SINGLE_PAGE_SUCCESS, LIKE_USER_POST, UNLIKE_USER_POST,
    USER_POSTS_LIKE, USER_POSTS_UNLIKE, SINGLE_PAGE_LIKE, SINGLE_PAGE_UNLIKE,
    ADD_REPLY_TO_POST_FAIL, ADD_REPLY_TO_POST_SUCCESS, GET_REPlY_POST_SUCCESS, GET_NOTIFICATIONS_SUCCESS,
     DELETE_POST, DELETE_USER_POST,DELETE_COMMENT_POST
} from './types'
//FIRST//////////////////////////////////////////////////////////
interface AddPostFirst {
    type: typeof ADD_POST_FIRST,
    isLoading: boolean,
}
interface GetPostFirst {
    type: typeof GET_POST_FIRST,
    isLoading: boolean
}
interface GetUserPostFirst {
    type: typeof GET_USER_POSTS_FIRST,
    isLoading: boolean
}
interface GetPostSingleFirst {
    type: typeof GET_USER_SINGLE_PAGE_FIRST,
    isLoading: boolean,
}
//SUCCESS//////////////////////////////////////////////////////////
interface AddPostSuccess {
    type: typeof ADD_POST_SUCCESS,
    payload: {
        posts: [],
        message: string,
    },
    isLoading: boolean,
}

interface GetPostSuccess {
    type: typeof GET_POST_SUCCESS,
    payload: {
        posts: [],
    },
    message: string,
    isLoading: boolean,
}
interface GetUserPostSuccess {
    type: typeof GET_USER_POSTS_SUCCESS,
    payload: {
        // posts:[],
        userPosts: [],
    },
    message: string,
    isLoading: boolean,
}

interface GetPostSingleSuccess {
    type: typeof GET_USER_SINGLE_PAGE_SUCCESS,
    payload: {
        singlePost: SinglePost,
    }
    message: string,
    isLoading: boolean,
}
interface LikePost {
    type: typeof LIKE_USER_POST,
    payload: {
        posts: [],
        message: string,
        _id: string,
    },
    isLoading: boolean,
}
interface UnlikePost {
    type: typeof UNLIKE_USER_POST,
    payload: {
        posts: mainPost[],
        message: string,
        _id: string,
    }
    isLoading: boolean
}
interface ProfilePostLike {
    type: typeof USER_POSTS_LIKE,
    payload: {
        userPosts: [],
        message: string,
        _id: string,
    }
    isLoading: boolean,
}
interface ProfilePostUnLike {
    type: typeof USER_POSTS_UNLIKE,
    payload: {
        userPosts: [],
        message: string,
        _id: string,
    }
    isLoading: boolean,
}
export interface SinglePageLikeAction {
    type: typeof SINGLE_PAGE_LIKE;
    payload: {
        _id: string;
        userId: string;
        message: string;
    };
    isLoading: boolean;
}
export interface SinglePageUnLikeAction {
    type: typeof SINGLE_PAGE_UNLIKE;
    payload: {
        _id: string;
        userId: string;
        message: string;
    };
    isLoading: boolean;
}
export interface AddReplySuccess {
    type: typeof ADD_REPLY_TO_POST_SUCCESS;
    payload: {
        postReplyComments: [],
    }
    message: string,
    isLoading: boolean,
}
interface GetReplyPost {
    type: typeof GET_REPlY_POST_SUCCESS,
    payload: {
        postReplyComments: [],
    }
    message: string,
    isLoading: boolean,
}
interface GetNotifications {
    type: typeof GET_NOTIFICATIONS_SUCCESS,
    payload: {
        notifications: [],
    },
    message: string,
    isLoading: boolean,
}
interface Delete {
    type: typeof DELETE_POST,
    payload: {
        postId: string,
    },
}
interface DeleteUserPost {
    type: typeof DELETE_USER_POST,
    payload: {
        userPostId: string,
    }
}
interface DeleteComment {
    type:typeof DELETE_COMMENT_POST,
    payload:{
        mainPostId:string,
        commentId:string,
    }
}
//FAIL//////////////////////////////////////////////////////////
interface AddPostFail {
    type: typeof ADD_POST_FAIL,
    payload: {
        error: string,
    },
    isLoading: boolean,
}
interface GetPostFail {
    type: typeof GET_POST_FAIL,
    payload: {
        error: string,
    },
    isLoading: boolean,
}
interface GetUserPostFail {
    type: typeof GET_USER_POSTS_FAIL,
    payload: {
        error: string,
    },
    isLoading: boolean,
}
interface GetPostSingleFail {
    type: typeof GET_USER_SINGLE_PAGE_FAIL,
    payload: {
        error: string,
    }
    isLoading: boolean,
}
////////////////////////////////////////////
export interface mainPost {
    body: string,
    comments: [],
    likedIds: [],
    userId: string,
    _id: string,
    createdAt: Date,
}
export interface SinglePost {
    _id: string;
    body: string;
    userId: string;
    likedIds: string[];
    createdAt: string;
    comments: string[];
}
export interface CommentInterface {
    userId: string,
    body: string,
    createdAt: string;
    _id: string;
}
interface initState {
    posts: mainPost[],
    error: string,
    message: string,
    isLoading: boolean,
    userPosts: mainPost[],
    singlePost: SinglePost,
    postReplyComments: CommentInterface[];
    notifications: [],
}
const initialState: initState = {
    posts: [],
    userPosts: [],
    error: "",
    message: "",
    isLoading: false,
    singlePost: {
        _id: "",
        body: "",
        userId: "",
        likedIds: [],
        createdAt: "",
        comments: [],
    },
    postReplyComments: [],
    notifications: [],
}
type ActionTypes = AddPostSuccess | AddPostFirst | AddPostFail | GetPostFail
    | GetPostFirst | GetPostSuccess | GetUserPostFail | GetUserPostFirst | GetUserPostSuccess |
    GetPostSingleFirst | GetPostSingleFail | GetPostSingleSuccess | LikePost | UnlikePost | ProfilePostLike
    | ProfilePostUnLike | SinglePageLikeAction | SinglePageUnLikeAction | AddReplySuccess | GetReplyPost |
    GetNotifications | Delete | DeleteUserPost | DeleteComment
const PostsReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ADD_POST_FIRST:
        case GET_POST_FIRST:
        case GET_USER_POSTS_FIRST:
        case GET_USER_SINGLE_PAGE_FIRST:
            return {
                ...state,
                isLoading: true,
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload.posts,
                message: action.payload.message,
                isLoading: false,
            }
        case GET_POST_SUCCESS:
            const newPosts = action.payload.posts.filter((newPost: mainPost) => {
                return !state.posts || !state.posts.some((existPosts) => existPosts._id === newPost._id)
            })
            return {
                ...state,
                //checking if state.posts array or not if its not array it initialize as new array to concate with new posts 
                posts: Array.isArray(state.posts) ? [...state.posts, ...newPosts] : [...newPosts],
                message: action.payload,
                isLoading: false,
            }
        case GET_USER_POSTS_SUCCESS:
            return {
                ...state,
                // posts:action.payload.posts,
                userPosts: action.payload,
                message: action.message,
                isLoading: false,
            }
        case GET_USER_SINGLE_PAGE_SUCCESS:
            return {
                ...state,
                singlePost: action.payload,
                message: action.message,
                isLoading: false,
            }
        case LIKE_USER_POST:
            // Find the index of the liked post in the current posts array
            const likedPostIndex = state.posts.findIndex(
                (post) => post._id === action.payload._id
            );
            // Create a new state object with the updated post
            return {
                ...state,
                posts: state.posts.map((post, index) =>
                    index === likedPostIndex ? action.payload : post
                ),
                message: action.payload.message,
                isLoading: false,
            };
        case UNLIKE_USER_POST:
            const UnlikedPostIndex = state.posts.findIndex((post) => post._id === action.payload._id)
            return {
                ...state,
                posts: state.posts.map((post, index) => {
                    return index === UnlikedPostIndex ? action.payload : post
                }),
                message: action.payload.message,
                isLoading: false,
            }



        case USER_POSTS_LIKE:
            // Find the index of the liked post in the current posts array
            const profilePostsLike = state.userPosts.findIndex(
                (post: mainPost) => post._id === action.payload._id
            );
            // Create a new state object with the updated post
            return {
                ...state,
                userPosts: state.userPosts.map((post, index) =>
                    index === profilePostsLike ? action.payload : post
                ),
                message: action.payload.message,
                isLoading: false,
            };


        case USER_POSTS_UNLIKE:
            const UnlikeProfilePosts = state.userPosts.findIndex((post: mainPost) => post._id === action.payload._id)
            return {
                ...state,
                userPosts: state.userPosts.map((post, index) => {
                    return index === UnlikeProfilePosts ? action.payload : post
                }),
                message: action.payload.message,
                isLoading: false,
            }

        case SINGLE_PAGE_LIKE:
            // Check if the liked post is the singlePost
            if (state.singlePost?._id === action.payload._id) {
                // Update the likedIds in the singlePost
                const updatedSinglePost = {
                    ...state.singlePost,
                    likedIds: [...state.singlePost.likedIds, action.payload.userId],
                };

                return {
                    ...state,
                    singlePost: updatedSinglePost,
                    message: action.payload.message,
                    isLoading: false,
                };
            }

        case SINGLE_PAGE_UNLIKE:
            // Check if the liked post is the singlePost
            if (state.singlePost?._id === action.payload._id) {
                // Check if the user's ID is in the likedIds array
                if (state.singlePost.likedIds.includes(action.payload.userId)) {
                    // Remove the user's ID from the likedIds array
                    const updatedLikedIds = state.singlePost.likedIds.filter(
                        (id) => id !== action.payload.userId
                    );
                    const updatedSinglePost = {
                        ...state.singlePost,
                        likedIds: updatedLikedIds,
                    };

                    return {
                        ...state,
                        singlePost: updatedSinglePost,
                        message: action.payload.message,
                        isLoading: false,
                    };
                }
            }
        case ADD_REPLY_TO_POST_SUCCESS:
            const newReply = action.payload;
            return {
                ...state,
                postReplyComments: [...state.postReplyComments, newReply],
                isLoading: false,
            }
        case DELETE_POST:
            const { postId } = action.payload
            console.log(postId)
            const updatedPosts = state.posts.filter((post) => post._id !== postId)
            console.log(updatedPosts)
            return {
                ...state,
                posts: updatedPosts,
            }

        case DELETE_USER_POST:
            const { userPostId } = action.payload
            const updatedUserPosts = state.userPosts.filter((post) => post._id !== userPostId)
            return {
                ...state,
                userPosts: updatedUserPosts,
            }
        case DELETE_COMMENT_POST:
            const { mainPostId, commentId } = action.payload;
            const updatedComments = state.postReplyComments.filter(comment => comment._id !== commentId);
            return {
                ...state,
                postReplyComments: updatedComments,
                
            };
        case GET_REPlY_POST_SUCCESS:
            return {
                ...state,
                postReplyComments: action.payload,
                isLoading: false,
            }
        case GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: action.payload.notifications,
                isLoading: false,
            }
        case ADD_POST_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }


        case GET_POST_FAIL:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false,
            }
        case GET_USER_POSTS_FAIL:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false,
            }
        case GET_USER_SINGLE_PAGE_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }
}
export default PostsReducer