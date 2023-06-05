import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AccountDrawer from "../AccountDrawer/AccountDrawer"
import {TfiFlickrAlt} from "react-icons/tfi"
import useLocationStore from "../../store/useLocation.js";
import Locator from "../Locator/Locator"
import SearchBar from "../Searchbar"
import useAuthStore from "../../store/authStore";

export default function Header() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const {region, selectRegion} = useLocationStore();
  const {user} = useAuthStore();

  return (
    <>
      {pathname.includes("/account/ads/") ? (
        <div className="bg-white py-4 px-40 flex items-center justify-center border-b-2 mb-5">
          <Link to={"/"} className="flex gap-1 items-center justify-center">
            <TfiFlickrAlt size={20} />
            <span className="font-semibold md:text-xl ml-1 text-lg whitespace-nowrap">Eventify</span>
          </Link>
        </div>
      ) : (
        <div>
          <div
            className="bg-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-2 shadow-md"
          >
            <header className="flex sm:pb-0 pb-3 justify-between bg-white items-center gap-3 ">
              <Link to={"/"} className="flex gap-1 items-center justify-center md:mb-2 sm:mb-0">
               <TfiFlickrAlt size={25} className="text-violet-500" />
                <span className="font-semibold md:block mt-auto hidden text-xl">Eventify</span>
              </Link>
              <div className="md:flex hidden mb-2 sm:mb-0">
                <Locator initialValue={region} selectRegion={selectRegion} placeholder="Events in Pakistan"/>
              </div>
              <SearchBar />
              {user ? (
                <Link
                  className="cursor-pointer whitespace-nowrap bg-violet-600 p-2 rounded-md text-white md:block hidden mb-2 sm:mb-0"
                  to={"/create"}
                >
                  Create an Event
                </Link>
              ) : (
                <div
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="cursor-pointer whitespace-nowrap bg-violet-600 p-2 rounded-md text-white md:block hidden mb-2 sm:mb-0"
                >
                  Create an Event
                </div>
              )}

              <div className="flex items-center gap-3">
                {user ? (
                  <div className="flex">
                    <AccountDrawer />
                  </div>
                ) : (
                  <div
                    onClick={() => {navigate("/login")}}
                    className="md:flex hidden items-center gap-2 border border-gray-300 rounded-full py-2 my-2.5 px-4 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                    <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 relative top-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </header>
          </div>
        </div>
      )}
    </>
  );
}

