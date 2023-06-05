import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import HomeItem from '../components/HomeItem';
import axios from 'axios';
import NoItems from '../components/NoItems';
import useAuthStore from '../store/authStore';

const WishlistPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, token, isLiked} = useAuthStore();

    useEffect(()=>{
        if (!user && !token) {
            return;
        }
    fetchEvents(token);
    }, [user])

    const fetchEvents = async (token) => {
        setLoading(true);
        try {
          const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/auth/wishlist`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.data?.wishlist) {
            setEvents(res.data.wishlist);
          }
          else {
            setEvents(res.data);
          }
          setLoading(false);
        }
        catch (err) {
          console.log(err);
          setLoading(false);
        }
    };

  let likedAds = events?.filter(ad => isLiked(ad._id));

  return (
    <div className='min-h-[70vh]'>
     {likedAds.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            className="md:mt-8 mt-4 grid gap-x-6 gap-y-8 justify-items-center items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {likedAds.map((ad) => (
              isLiked(ad._id) && <HomeItem event={ad} key={ad._id} />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <>
          {loading && (
            <AnimatePresence mode="wait">
              <motion.div
                className="mt-8 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Skeleton className="md:w-[230px] w-full h-44 sm:h-48 md:h-56 rounded-2xl" />
                    <div>
                      <Skeleton className="md:w-[140px] w-[100px] h-4" />
                      <Skeleton className="md:w-[140px] w-[100px] h-4" />
                      <Skeleton className="md:w-[100px] w-[70px] h-4" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </>
      )}
      {likedAds.length === 0 && !loading && (
        <NoItems title="Your wishlist is empty." />
      )}
    </div>
  )
}

export default WishlistPage;