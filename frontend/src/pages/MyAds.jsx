import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import AdDrawer from "../components/AdDrawer";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function MyAds() {
  const [events, setEvents] = useState([]);
  const {token} = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
    window.scrollTo(0, 0);
  }, [token]);

  const fetchData = async (token) => {
    setLoading(true);
    await axios
      .get(`${import.meta.env.VITE_BASE_URI}/event/myevents`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setEvents(data);
      });
  };

  function truncateString(str) {
    if (str.length > 30) {
      return str.substring(0, 30) + "...";
    } else {
      return str;
    }
  }

  return (
    <div className={"min-h-[70vh] pt-10"}>
      <h3 className='text-3xl font-medium text-center sm:text-left'>My Events</h3>
      <div className="mt-4">
        {loading &&
          <div className="flex flex-col sm:flex-row my-4 gap-4 bg-white rounded-2xl border border-gray-300 p-4 ">
            <div className="w-32 h-32 flex overflow-hidden rounded-md">
              <Skeleton height={128} width={128} />
            </div>
            <div className="flex gap-32">
              <div className="flex-grow-0 flex-shrink">
                <h2 className="text-xl font-semibold text-gray-800">
                  <Skeleton height={24} width={200} />
                </h2>
                <p className="text-sm mt-2 text-gray-600">
                  <Skeleton height={18} count={2} width={300} />
                </p>
                <p className="text-sm mt-2 text-gray-600">
                  <Skeleton height={18} width={100} />
                </p>
              </div>
              <span className="text-sm mt-2 font-semibold">
                <span
                  className={`inline-block ml-1 rounded px-2 py-1`}
                >
                  <Skeleton width={80} />
                </span>
              </span>
              <p className="mt-2">
                <Skeleton height={18} width={200} />
              </p>
            </div>
          </div>
        }

        {events.length > 0 &&
          events.map((event) => (
            <div
              key={event._id}
              to={"/users" + event._id}
              onClick={() => navigate("/account/ads/" + event._id)}
              className="flex flex-col relative sm:flex-row my-4 cursor-pointer gap-4 bg-white hover:bg-gray-100 rounded-2xl border border-gray-300 p-4 "
            >
              <div className="w-32 h-32 bg-black flex overflow-hidden rounded-md">
                {event.images &&
                  <img src={event?.images[0]} alt="image" className="object-contain" />
                }
              </div>
              <div className="flex lg:gap-32 md:gap-20">
                <div className="relative">
                  <h2 className="md:text-xl text-sm md:font-semibold text-gray-800">
                    {truncateString(event.title)}
                  </h2>
                  <p className="text-sm mt-2 text-gray-600 md:block hidden">
                    {truncateString(event.description)}
                  </p>
                  <p className="text-sm mt-2 text-gray-600 md:block hidden">
                    Location: {truncateString(event.location)}
                  </p>
                </div>
                <span className="text-sm mt-2 font-semibold">
                  <span
                    className={`md:inline-block hidden ml-1 bg-red-100 rounded px-2 py-1`}
                  >
                    {event.status.toUpperCase()}
                  </span>
                </span>
              </div>
              <div className="ml-auto md:relative right-4 absolute">
                <AdDrawer ad={event} setAds={setEvents} />
              </div>
            </div>
          ))}

        {events.length === 0 && !loading &&
          <div className="mt-4 flex flex-col items-center justify-center gap-4 bg-white rounded-2xl border border-gray-300 p-4 ">
            <h2 className="text-xl font-semibold text-gray-800">
              No events found!
            </h2>
            <p className="text-sm mt-2 text-gray-600">
              You have not posted any events yet.
            </p>
          </div>
        }
      </div>
    </div>
  );
}
