import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {motion} from 'framer-motion'

const Wishlist_Icon = ({ isLiked, size = 25 }) => {
  return (
    <div>
        {isLiked ? (
             <motion.div
          className="relative w-fit text-[#FF585D]"
          whileTap={{ scale: 0.9 }}
        >
          <AiFillHeart size={size} className='absolute' />
          <AiOutlineHeart size={size} className='absolute text-gray-200 z-10' />
        </motion.div>
        ) : (
            <motion.div className='relative w-fit'
            whileTap={{ scale: 0.9 }}
            >
                <AiFillHeart size={size} className='absolute opacity-50' />
                <AiOutlineHeart size={size} className='absolute text-gray-200 z-10' />
            </motion.div>
        )}
    </div>
  );
};

export default Wishlist_Icon;
