import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NoItems from "../components/NoItems";
import { motion, AnimatePresence } from "framer-motion";
import HomeItem from "../components/HomeItem";
import useLocationStore from "../store/useLocation"

export default function Home({ setProgress }) {

    const [events, setevents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { region, selectRegion } = useLocationStore();  

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  function debounce(func, wait) {
    let timeout;
  
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
  
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const fetchEvents = async (page = 1, limit = 15) => {
    let queryUrl = buildUrl();
    const URL = `${import.meta.env.VITE_BASE_URI}/event/${q ? `?q=${q}` : ""}${queryUrl ? queryUrl + '&' : '?'}page=${page}&limit=${limit}`;
    try {
      const response = await axios.get(URL);
      setevents(prevevents => [...prevevents, ...response.data.events]);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setProgress(100);
    }
  }
  
  const debouncedFetchEvents = debounce(fetchEvents, 500);

  const buildUrl = () => {
    let url = "";
    let queryParams = [];

    if (region) {
      queryParams.push(`region=${region}`);
    }

    if (queryParams.length > 0) {
      url += q ? "&" + queryParams.join("&") : "?" + queryParams.join("&");
    }

    return url;
  };

  useEffect(() => {
    setevents([]);
    setLoading(true);
    setProgress(50);
    debouncedFetchEvents(currentPage);
    window.scrollTo(0, 0);
  }, [q, region]);
  

  return (
    <>
      {events.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            className="md:mt-8 mt-4 grid gap-x-6 gap-y-8 justify-items-center items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {events.map((event) => (
              <HomeItem event={event} key={event._id} />
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

      {
        !loading && events.length === 0 && (
          <NoItems title="No events found" description="Try changing the keywords or search in another location" />
        )
      }

      {
        !loading && events.length > 0 && currentPage < totalPages && (
          <div className="flex justify-center mt-4">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
              onClick={() => {setProgress(50); debouncedFetchEvents(currentPage + 1)}}
            >
              Load More
            </button>
          </div>
        )
      }
      {
        !loading && events.length > 0 && currentPage === totalPages && (
          <div className="flex justify-center mt-4">
            <p className="text-gray-800">No more events to show</p>
          </div>
        )
      }
    </>
  );
}