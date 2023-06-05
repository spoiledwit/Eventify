import { useState, useEffect } from 'react'
import axios from 'axios'
import {BsThreeDotsVertical} from 'react-icons/bs'
import useAuthStore from '../store/authStore'
import {toast} from "react-hot-toast"

const AdDrawer = ({ad, setAds}) => {
  const [showPopup, setShowPopup] = useState(false);
  const { token } = useAuthStore();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const closePopup = (e) => {
      if (showPopup && e.target.id !== "icon") {
        setShowPopup(false);
      }
    };
    document.addEventListener("click", closePopup);
    return () => document.removeEventListener("click", closePopup);
  }, [showPopup]);


    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URI}/event/${ad._id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            setAds((prevAds) => prevAds.filter((prevAd) => prevAd._id !== ad._id));
            toast.success("Ad deleted successfully"); 
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="flex items-centerrelative">
      {/* Avatar Image */}
      <div className="relative">
        <button
        className='bg-white p-2 rounded-full hover:shadow-md outline-none focus:outline-none'
        onClick={(e)=>{e.stopPropagation(); togglePopup()}}
        >
            <BsThreeDotsVertical id="icon" className="text-2xl" />
        </button>
        {showPopup && (
          <div className="absolute px-2 right-0 top-10 bg-white shadow-md rounded-lg  py-2 mt-4 min-w-[12rem] z-50">
            <button
            className='bg-white px-2 py-0.5 w-full text-left rounded-md hover:bg-gray-100 outline-none focus:outline-none'
            onClick={(e)=>{e.stopPropagation(); handleDelete(); togglePopup()}}
            >
                delete
            </button>
          </div>)}
      </div>
    </div>
  )
}

export default AdDrawer;