'use client'
import React , {useEffect , useState} from 'react'
import { fetchAllUsers } from '@/app/Redux/Login/Action'
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import Button from '../Buttons/Button'
function FollowBar() {
  const dispatch = useDispatch()
  const {users} = useSelector((state:RootState)=> state.user)
  const [currentPage , setCurrentPage] = useState(1)
  console.log(users , `usersss`)
  const handleLoadMore =() =>{
    setCurrentPage((prevPage) => prevPage + 1);

  }
  useEffect(()=>{
    console.log('Current page:', currentPage);

    dispatch(fetchAllUsers(currentPage) as any)
  },[dispatch , currentPage])
  if (!Array.isArray(users)) {
    return null; // or display loading/error message
  }


  return (
    <div className='px-6 py-4 hidden lg:block'>
        <div className='bg-neutral-800 rounded-xl p-4'>
        <h3 className='text-white text-xl font-semibold' >Who to Follow</h3>
        <div className='flex flex-col gap-4 mt-4'>
            {users.map((user)=>(
              <div>
                <p className='text-white'>
                  {user.firstName}
                </p>
                <p className='text-neutral-400 text-sm'>
                  @{user.firstName + user.lastName}
                </p>
              </div>
            ))}
            <Button label='Load More'  onClick={handleLoadMore}/>
        </div>
        </div>
    </div>
  )
}

export default FollowBar