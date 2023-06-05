import React from 'react'
import Icon from './Icon'
import { Link } from 'react-router-dom'
import {FiUpload, FiLogOut } from "react-icons/fi"
import { AiOutlineHeart } from "react-icons/ai";
import {RiNotification4Line} from "react-icons/ri"
import { Modal } from '@mui/material'
import Notification from '../Notification/Notification'
import { useState, useEffect } from 'react'
import useAuthStore from '../../store/authStore'

const AccountDrawer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const {user, setUser, setToken} = useAuthStore();
  
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  useEffect(() => {
    const closePopup = (e) => {
      if (showPopup && e.target.id !== "icon1" && e.target.id !== "icon2") {
        setShowPopup(false);
      }
    };
    document.addEventListener("click", closePopup);
    return () => document.removeEventListener("click", closePopup);
  }, [showPopup]);

  function logout() {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
  }

  return (
    <div className="h-16 flex items-center bg-white relative">
      {/* Avatar Image */}
      <div className="relative">
        <Icon id={"icon"} text={user.name? user.name : user.email} image={null} click={togglePopup}/>
        {unread > 0 && <div className="absolute top-0 right-0 bg-violet-600 rounded-full w-3 h-3" />}
        {showPopup && (
          <div className="absolute px-2 right-0 top-10 bg-white shadow-md rounded-lg  py-2 mt-4 min-w-[12rem] z-50">
            {user.name && <div> 
              <h4 className='mx-2 font-bold text-sm'>{user.name}</h4>
              <p className='text-gray-800 text-sm mb-2 mx-2 font'>
              {user.email}
              </p> </div>}
            {!user.name && user.email && <div>        
              <p className='text-gray-800 text-sm mb-2 mx-2 font-bold'>
              {user.email}
            </p>
            </div>
            }
            <hr className='mb-2' />
            <button
                onClick={()=>{setShowPopup(false); setOpen(true);}}
                className="flex items-center bg-white w-full gap-2 px-3 text-sm py-2 rounded-lg hover:bg-gray-200"
                >
               <RiNotification4Line size={17} className='text-violet-500'/>
                Notifications
                {unread > 0 && <div className="mb-3 bg-violet-500 rounded-full w-2 h-2" />}
            </button>
            <Link
                to="/wishlist"
                className="flex items-center gap-2 px-3 text-sm py-2 rounded-lg hover:bg-gray-200"
                >
                <AiOutlineHeart size={17} className='text-violet-500'/>
                Wishlist
            </Link>
            <Link
                to="/myevents"
                className="flex items-center gap-2 px-3 text-sm py-2 rounded-lg hover:bg-gray-200"
                >
                <FiUpload size={17} className='text-violet-500'/>
                My Events
            </Link>
            <div
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 text-gray-800 text-sm cursor-pointer rounded-lg hover:bg-gray-200"
            >
                <FiLogOut size={16} className='text-violet-500'/>
              Logout
            </div>
          </div>
        )}
        {(
          <Modal
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          className="flex items-center justify-center"
          style={{ border: "none" }}
          >
            <div className="bg-white h-[480px] w-[380px] rounded-lg shadow-md">
              <Notification setOpenModal={setOpen} />
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default AccountDrawer