  'use client'
  import React , {useEffect , useState} from 'react'
  import { fetchAllUsers } from '@/app/Redux/Login/Action'
  import { useDispatch , useSelector } from 'react-redux'
  import { RootState } from '@/app/Redux/MainStore/rootReducer'
  import Button from '../Buttons/Button'
  import Avatar from './Avatar'
  import Loading from './loading'
  function FollowBar() {
    const dispatch = useDispatch()
    const {users} = useSelector((state:RootState)=> state.user)
    const [page , setPage] = useState(1)
    const [loadingComplete, setLoadingComplete] = useState(false);

    const handleLoadMore = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      dispatch(fetchAllUsers(nextPage) as any);
    };
    if (!Array.isArray(users)) {
      return null;
    }

    useEffect(() => {
      dispatch(fetchAllUsers(page) as any)
        .then(() => {
          setLoadingComplete(true);
        });
    }, [dispatch, page]);
  
    if (!loadingComplete ) {
      return <Loading isLoading={true} />;
    }
    return (
      <div className='px-6 py-4 hidden lg:block'>
          <div className='bg-neutral-200 dark:bg-neutral-800 rounded-xl p-4'>
          <h3 className='text-black dark:text-white text-xl font-semibold' >Who to Follow</h3>
          <div className='flex flex-col gap-4 mt-4' >
              {users.map((user)=>(
                <div key={user._id} className='flex flex-row gap-4'>
                  <Avatar userId={user._id} isLarge={false} imageType='profile' user={user}/>
                  <div className='flex flex-col'>
                  <p className='text-black dark:text-white'>
                    {user.firstName}
                  </p>
                  <p className='text-neutral-400 text-sm'>
                    @{user.lastName}
                  </p>
                  </div>
                </div>
              ))}
              {users.length >= 10 &&  
              <Button label='Another users'  onClick={handleLoadMore}/>
              }
          </div>
          </div>
      </div>
    )
  }

  export default FollowBar