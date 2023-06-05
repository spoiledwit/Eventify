import {create} from 'zustand';

const useLocationStore = create((set) => ({
  region: "Pakistan",
  selectRegion: (region) => set({ region }),
}));


export default useLocationStore;