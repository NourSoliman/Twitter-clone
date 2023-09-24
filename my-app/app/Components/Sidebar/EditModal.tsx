import React , {useState , useCallback , useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import { ChangeBioAction, GetUserData  } from '@/app/Redux/Login/Action'
import {  CloseEditForm } from '@/app/Redux/dialog/Actions'
import Modal from '../Modals/Modal'
import { useRouter } from 'next/navigation'
import Input from '../Modals/Inputs'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'
import ImageUploadModal from '../Modals/ImageUploadModal'
const  EditModal = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { user }: any = useSelector((state: RootState) => state.user);
    const [profileImage ,setProfileImage] = useState(user?.profileImage || ``)
    const [coverImage , setCoverImage] = useState(user?.coverImage || '')
    const [firstName , setFirstName] = useState(user?.firstName || '')
    const [bio , setBio] = useState(user?.bio || '')
    const token: any = Cookies.get(`token`)
    const decode: { userId: string } = jwt_decode(token);
    const currentUser = decode.userId;
    console.log(currentUser , `userId from editModal`)
    const isEditFormOpen = useSelector((state:RootState)=>state.dialog.isEditFormOpen)
    const handleCloseEditForm = () =>{
        dispatch(CloseEditForm())
    }
    // const onSubmit = () =>{
    //     console.log(`submiteed`)
    // }
    useEffect(()=>{
        setProfileImage(user?.profileImage)
        setCoverImage(user?.coverImage)
        setFirstName(user?.firstName)
        setBio(user?.bio)
    },[user])
    const onSubmit = useCallback(()=>{
      const updatedFields = {
        firstName : firstName,
        bio:bio,
        profileImage:profileImage,
        coverImage : coverImage
      }
      dispatch(ChangeBioAction(currentUser , updatedFields) as any)
      dispatch(CloseEditForm())
      window.location.reload()
      toast.success(`Updated`)
    },[dispatch , firstName , bio , profileImage , coverImage , user , currentUser , router])
    const ContentBody = (
      <div className='flex flex-col gap-4'>
        <ImageUploadModal value={profileImage} onChange={((image) => setProfileImage(image))} label="Upload Profile Image"/>
        <ImageUploadModal value={coverImage} onChange={((image) => setCoverImage(image))} label="Upload Cover Image"/>
        <Input placeholder='First Name' value={firstName} type="text" onChange={(e) => setFirstName(e.target.value)}/>
        <Input placeholder='Bio' value={bio} type="text" onChange={(e) => setBio(e.target.value)}/>
      </div>
    )
  return (
    <>
    <Modal isOpen={isEditFormOpen} title="Edit your infos"
    body={ContentBody}
    onClose={handleCloseEditForm} onSubmit={onSubmit} actionLabel="save"/>
    </>
  )
}

export default EditModal