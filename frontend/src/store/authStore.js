import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set, get) => ({
    token: "",
    user: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    addToWishlist: async (eventId) => {
      if (!get().user) {
        return;
      }
      const isLiked = get().user.wishlist && get().user.wishlist.some((item) => item === eventId);
      
      // instantaneously update UI
      let wishlist;
      if (isLiked) {
        wishlist = get().user.wishlist.filter((item) => item !== eventId);
      } else {
        wishlist = get().user.wishlist ? [...get().user.wishlist, eventId] : [eventId];
      }
    
      set({ user: { ...get().user, wishlist } });
    
      const URL = isLiked
        ? `${import.meta.env.VITE_BASE_URI}/auth/remove/${eventId}`
        : `${import.meta.env.VITE_BASE_URI}/auth/add/${eventId}`;
    
      const response = await axios.post(URL, {}, {
        headers: {
          Authorization: "Bearer " + get().token,
        },
      });
    },
      
      isLiked: (eventId) => {
        if (!get().user) {
          return false;
        }
        return get().user.wishlist && get().user.wishlist.some((item) => item === eventId);
      },

      getWishlist: async (token) => {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/auth/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
}));

export default useAuthStore;