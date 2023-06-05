import { useNavigate } from 'react-router-dom';
import { format } from "timeago.js"
import Wishlist_Icon from '../Wishlist_Icon';
import useAuthStore from '../../store/authStore';

const HomeItem = ({ event }) => {
    const { user, token, isLiked, addToWishlist  } = useAuthStore();
    const navigate = useNavigate();
    const handleWishlist = async (eventId) => {
        if (!user) {
            setOpen(true);
            return;
        }
        await addToWishlist(eventId, user, token);
    }

    return (
        <div className='relative w-fit'>
            <div className="absolute top-3 z-20 cursor-pointer right-9" 
            onClick={(e) => {
                e.stopPropagation();
                handleWishlist(event._id);
            }}            
            >      <Wishlist_Icon isLiked={isLiked(event._id)} size={26} />
            </div>
            <div className="cursor-pointer max-w-[230px]" onClick={() => { navigate(`/item/${event._id}`) }} key={event._id}>
                <div className="bg-white mb-2 rounded-2xl flex relative overflow-hidden">
                    {event.images?.[0] && (
                        <img
                            className="rounded-2xl md:h-[225px] h-[160px] object-cover aspect-square transition-transform duration-200 ease-in-out transform hover:scale-110"
                            src={`${event.images?.[0]}`}
                            alt=""
                            loading="lazy"
                        />
                    )}
                </div>
                <div className='flex items-center'>
                    <h2 className="text-sm font-medium">{event.title.length > 17 ? event.title.slice(0, 17) + "..." : event.title}</h2>
                    <span className="text-[8px] md:block hidden ml-auto text-gray-500">{format(event.createdAt)}</span>
                </div>
                <h3 className="text-xs mt-1 text-gray-500">{event.location.length > 18 ? event.location.slice(0, 18) + "..." : event.location}</h3>
            </div>
        </div>
    )
}

export default HomeItem; 1