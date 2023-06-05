import React from 'react';

const ParticipationWidget = ({Event, onJoin, joined}) => {
  return (
      <div className="card bg-white shadow-md rounded-lg max-h-[220px]">
        <div className="card-body p-4">
          <h5 className="card-title text-xl font-bold mb-2">{Event.title}</h5>
          <p className="card-text text-gray-700 mb-4">{Event.description}</p>
          <p className="card-text text-gray-700 mb-2">Location: {Event.location}</p>
          <button className={`px-4 py-2 rounded-lg text-white font-semibold ${!joined ? 'bg-violet-500' : 'bg-gray-500'} hover:bg-violet-600 transition-colors duration-300`} onClick={onJoin}>{joined ? "Already joined" : "Join now"}</button>
          {Event.recurring && 
          <p className='text-sm bg-green-200 w-fit px-2 py-1 rounded-full mt-3'>Recurring</p>}
        </div>
      </div>
  );
};

export default ParticipationWidget;
