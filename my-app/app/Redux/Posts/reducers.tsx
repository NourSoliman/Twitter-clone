import {
    ADD_POST_FIRST, ADD_POST_SUCCESS, ADD_POST_FAIL,
    GET_POST_FIRST, GET_POST_FAIL, GET_POST_SUCCESS, GET_USER_POSTS_FAIL, GET_USER_POSTS_FIRST,
    GET_USER_POSTS_SUCCESS, GET_USER_SINGLE_PAGE_FAIL, GET_USER_SINGLE_PAGE_FIRST,
    GET_USER_SINGLE_PAGE_SUCCESS, LIKE_USER_POST, UNLIKE_USER_POST,
    USER_POSTS_LIKE, USER_POSTS_UNLIKE, SINGLE_PAGE_LIKE, SINGLE_PAGE_UNLIKE,
    ADD_REPLY_TO_POST_FAIL , ADD_REPLY_TO_POST_SUCCESS , GET_REPlY_POST_SUCCESS
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
        posts: [],
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
export interface AddReplySuccess{
    type:typeof ADD_REPLY_TO_POST_SUCCESS;
    payload:{
        postReplyComments:string[],
    }
    message:string,
    isLoading:boolean,
}
interface GetReplyPost{
    type:typeof GET_REPlY_POST_SUCCESS,
    payload:{
        postReplyComments:string[],
    }
    message:string,
    isLoading:boolean,
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
    userId:string,
    body:string,
    createdAt: string;
    _id: string;
}
interface initState {
    posts: mainPost[],
    error: string,
    message: string,
    isLoading: boolean,
    userPosts: [],
    singlePost: SinglePost,
    postReplyComments:[];
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
        createdAt:"",
        comments: [],
    },
    postReplyComments:[],
}
type ActionTypes = AddPostSuccess | AddPostFirst | AddPostFail | GetPostFail
    | GetPostFirst | GetPostSuccess | GetUserPostFail | GetUserPostFirst | GetUserPostSuccess |
    GetPostSingleFirst | GetPostSingleFail | GetPostSingleSuccess | LikePost | UnlikePost | ProfilePostLike
    | ProfilePostUnLike | SinglePageLikeAction | SinglePageUnLikeAction | AddReplySuccess | GetReplyPost
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
            console.log(action.payload, `action.payload.postssss`)
            const newPosts = action.payload.filter((newPost: mainPost) => {
                return !state.posts || !state.posts.some((existPosts) => existPosts._id === newPost._id)
            })

            console.log(newPosts, `this new posts from redux`)
            // console.log(state.posts , `dey el state.posts`)
            // console.log([...state.posts , ...newPosts] , `DEY ARRAAAAAAAAAY`)
            return {
                ...state,
                // posts: newPosts,
                posts:[...state.posts , ...newPosts],
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
        // case LIKE_USER_POST:
        //     return{
        //         ...state,
        //         posts:action.payload.posts,
        //         message:action.payload.message,
        //         isLoading:false,
        //     }
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
            console.log(profilePostsLike, `profilePostsLike`)
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
                return{
                    ...state,
                    postReplyComments:action.payload,
                    isLoading:false,
                }
            case GET_REPlY_POST_SUCCESS:
                return{
                ...state,
                postReplyComments:action.payload,
                isLoading:false,
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