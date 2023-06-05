import { create } from "zustand";

const useSocketStore = create((set) => ({
    socket: null,
    setSocket: (socket) => set({ socket }),
}));

export default useSocketStore;