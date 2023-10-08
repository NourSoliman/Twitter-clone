
import React  from 'react'
import Header from '@/app/Components/Header/Header'
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import { useSelector , useDispatch } from 'react-redux'
import Login from '@/app/Components/LoginSystem/Login'
import Register from '@/app/Components/LoginSystem/Register'
import { GetAllPosts } from '@/app/Redux/Posts/actions'
import Home from '@/app/Components/HomeContent/Home'
import AddPost from '@/app/Components/HomeContent/AddPost'
import { GetLoggedInUser , GetUserData } from '@/app/Redux/Login/Action'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
function page() {
  // const dispatch = useDispatch()
  // const [page , setPage] = useState(1);
  //   const {posts} = useSelector((state:RootState) => state.posts)
  //   const token: string | null = Cookies.get('token') || null;
    // Decode the token to get the user ID (assuming the token contains a userId field)
    // const decode: { userId: string , followingIds:[], } | null = token ? jwt_decode(token) : null;
    // const currentUser = decode?.userId || ``;
    // useEffect(()=>{
    //   dispatch(GetAllPosts(page) as any)
    //   dispatch(GetLoggedInUser(currentUser) as any)
    // },[dispatch , page ])


  return (
    <div >
      <Login />
      <Register />
      <Header label={"Home"} />
      <AddPost placeHolder="what's going on?" isreply={false} />
      {/* <Home posts={posts}/> */}
      <Home />
      </div>
  )
}

export default page