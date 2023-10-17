import {
    ADD_POST_FIRST, ADD_POST_SUCCESS, ADD_POST_FAIL,
    GET_POST_FIRST, GET_POST_FAIL, GET_POST_SUCCESS, GET_USER_POSTS_FAIL, GET_USER_POSTS_FIRST,
    GET_USER_POSTS_SUCCESS, GET_USER_SINGLE_PAGE_FAIL, GET_USER_SINGLE_PAGE_FIRST,
    GET_USER_SINGLE_PAGE_SUCCESS, LIKE_USER_POST, UNLIKE_USER_POST, USER_POSTS_LIKE,
    USER_POSTS_UNLIKE, SINGLE_PAGE_LIKE, SINGLE_PAGE_UNLIKE, ADD_REPLY_TO_POST_SUCCESS,
    GET_REPlY_POST_SUCCESS,
    GET_NOTIFICATIONS_SUCCESS,
    DELETE_POST,
    DELETE_USER_POST,
    DELETE_COMMENT_POST
} from './types'
import { Dispatch } from 'redux'
import Cookies from "js-cookie";
// const serverUrl = "http://localhost:1997/api"
const serverUrl = "https://twitter-clone-h1eq.onrender.com/api"
const getBearerToken = () => {
    const token = Cookies.get(`token`)
    return token
}
export const addPost = (userId: string, postContent: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const token = getBearerToken()
            dispatch({ type: ADD_POST_FIRST })
            const response = await fetch(`${serverUrl}/post/${userId}`, {
                method: `POST`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ body: postContent })
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data, `data from posts action`)
                dispatch({
                    type: ADD_POST_SUCCESS,
                    payload: data
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const GetAllPosts = (page: number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({type:GET_POST_FIRST})
            const response = await fetch(`${serverUrl}/allposts/${page}`)

            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: GET_POST_SUCCESS,
                    payload: data,
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const GetAllUserPosts = (userId: string, page: number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: GET_USER_POSTS_FIRST })
            const response = await fetch(`${serverUrl}/userposts/${userId}/${page}`)
            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: GET_USER_POSTS_SUCCESS,
                    payload: data.posts,
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
//GET POST SINGLE PAGE
export const GetPostSinglePage = (userId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: GET_USER_SINGLE_PAGE_FIRST })
            const response = await fetch(`${serverUrl}/singlePost/${userId}`)

            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: GET_USER_SINGLE_PAGE_SUCCESS,
                    payload: data,
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const LikePost = (postId: string) => {
    return async (dispatch: Dispatch) => {
        const token = getBearerToken()
        try {
            const response = await fetch(`${serverUrl}/likePost/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: LIKE_USER_POST,
                    payload: data.updatedPost,
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const LikeProfilePost = (postId: string) => {
    return async (dispatch: Dispatch) => {
        const token = getBearerToken()
        try {
            const response = await fetch(`${serverUrl}/likePost/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: USER_POSTS_LIKE,
                    payload: data.updatedPost,
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const UnLikePost = (postId: string) => {
    return async (dispatch: Dispatch) => {
        const token = getBearerToken()
        try {
            const response = await fetch(`${serverUrl}/unlikePost/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: UNLIKE_USER_POST,
                    payload: data.updatedPost,
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const UnLikeProfilePost = (postId: string) => {
    return async (dispatch: Dispatch) => {
        const token = getBearerToken()
        try {
            const response = await fetch(`${serverUrl}/unlikePost/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: USER_POSTS_UNLIKE,
                    payload: data.updatedPost,
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const SinglePageLike = (postId: string) => {
    return async (dispatch: Dispatch) => {
        const token = getBearerToken()
        try {
            const response = await fetch(`${serverUrl}/likePost/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: SINGLE_PAGE_LIKE,
                    payload: data.updatedPost,
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const SinglePageUnLike = (postId: string) => {
    return async (dispatch: Dispatch) => {
        const token = getBearerToken()
        try {
            const response = await fetch(`${serverUrl}/unlikePost/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: SINGLE_PAGE_UNLIKE,
                    payload: data.updatedPost,
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
    export const replyOnPost = (postId: string, postContent: string) => {
        return async (dispatch: Dispatch) => {
            const token = getBearerToken()
            try {
                const response = await fetch(`${serverUrl}/reply/${postId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ body: postContent })
                })
                if (response.ok) {
                    const data = await response.json()
                    dispatch({
                        type: ADD_REPLY_TO_POST_SUCCESS,
                        payload: data.reply,
                    })
                } else {
                    const dataError = await response.json()
                    throw new Error(dataError)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

export const getReplyOnPosts = (postId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await fetch(`${serverUrl}/posts/reply/${postId}`)
            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: GET_REPlY_POST_SUCCESS,
                    payload: data.comments,
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getNotifications = () => {
    return async (dispatch: Dispatch) => {
        const token = getBearerToken()
        try {
            const response = await fetch(`${serverUrl}/notifications`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: GET_NOTIFICATIONS_SUCCESS,
                    payload: data,
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const DeletePost = (postId : string) => {
    return async (dispatch: Dispatch) => {
        const token = getBearerToken()
        try {
            const response = await fetch(`${serverUrl}/deletePost/${postId}`,{
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: DELETE_POST,
                    payload: {postId : data.deletedPost._id},
                })

            } else {
                const dataError = await response.json()
                throw new Error(dataError.error)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const DeleteUserPost = (postId : string) => {
    return async (dispatch: Dispatch) => {
        const token = getBearerToken()
        try {
            const response = await fetch(`${serverUrl}/deletePost/${postId}`,{
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: DELETE_USER_POST,
                    payload: {userPostId : data.deletedPost._id},
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError.error)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const DeleteCommentFromPost = (postId : string , commentId : string) => {
    return async (dispatch: Dispatch) => {
        const token = getBearerToken()
        try {
            const response = await fetch(`${serverUrl}/deleteReply/${postId}/${commentId}`,{
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: DELETE_COMMENT_POST,
                    payload:{commentId}
                })
            } else {
                const dataError = await response.json()
                throw new Error(dataError.error)
            }
        } catch (error) {
            console.log(error)
        }
    }
}