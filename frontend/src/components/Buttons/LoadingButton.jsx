import React from "react";
import Styles from "./LoadingButton.module.css";

const LoadingButton = ({ isLoading, onClick, text}) => {
  
  const handleClick = async () => {
    e.preventDefault();
    console.log('clicked');
    await onClick(e);
  };

  return (
    <button
      className={`${isLoading ? "bg-violet-700" : "bg-violet-600"} font-semibold bg-violet-600 hover:bg-violet-700 rounded-xl min-w-[82px] flex items-center justify-center w-full text-center text-white h-12 py-2 px-4 focus:outline-none focus:shadow-outline}`}
      onClick={handleClick}
    >
      {isLoading ? (
        <div className={Styles.dotFlashing}>
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};


export default LoadingButton;
