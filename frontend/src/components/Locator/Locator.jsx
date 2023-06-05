import React, { useEffect, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { GrLocation } from "react-icons/gr";
import { GoLocation } from "react-icons/go";

const libraries = ["places"];
const API_KEY = import.meta.env.VITE_GOOGLE_LOCATOR_API_KEY;

const Locator = ({
  selectRegion,
  placeholder = "Pakistan",
  width = "0",
  initialValue = "",
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const [address, setAddress] = useState(initialValue || "");
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);


  const onPlaceChanged = (placeId) => {
    const request = { placeId };
    placesService.current.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setAddress(place.formatted_address);
      }
    });
  };

  const onPredictionSelect = (prediction) => {
    selectRegion(prediction.description);
    setShowPredictions(false);
    if (prediction.isCustom) {
      setAddress(prediction.description);
    } else {
      onPlaceChanged(prediction.place_id);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      const map = new window.google.maps.Map(document.getElementById("map-canvas"), {
        zoom: 5,
        center: new window.google.maps.LatLng(50, 50),
      });
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      placesService.current = new window.google.maps.places.PlacesService(map);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && address.length > 0) {
      autocompleteService.current.getPlacePredictions({
        input: address,
        types: ["(regions)"],
        componentRestrictions: { country: "PK" } // Restrict to Pakistan
      }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // Limit the description up to 3 levels
          const limitedPredictions = predictions.map(prediction => ({
            ...prediction,
            description: prediction.description.split(',').slice(0, 3).join(',')
          }));
          setPredictions(limitedPredictions);
        }
      });
    } else {
      setPredictions([]);
    }
  }, [address, isLoaded]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div></div>;
  }

  return (
    <div className={`${width==="0" ? "md:ml-7" : "" } relative`}>
      <div className="flex items-center border rounded-full pl-3">
        <GoLocation size={20} className="text-gray-600" />
        <input
          id="autocomplete"
          onFocus={() => setShowPredictions(true)}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={placeholder}
          value={address}
          className={`py-2 px-3 rounded-full h-12 focus:outline-none ${width === "0" ? "lg:w-[230px] md:w-[200px] w-[150px]" : "w-full" } `}
        />

        <div
          id="map-canvas"
          style={{ display: "none" }}
        />
      </div>
      {address.length > 0 && showPredictions && (
        <div className="pac-container absolute w-full sm:w-64 md:w-96 overflow-hidden mt-2 bg-white z-10 rounded-md shadow-md p-3"
        >
          {predictions.map((prediction, index) => (
            <div key={index} className="flex items-center py-1 hover:bg-red-100 cursor-pointer" onClick={() => onPredictionSelect(prediction)}>
              <GrLocation size={20} className="mr-2 text-primary min-w-[20px]" />
              <p className="text-sm sm:text-base whitespace-nowrap">
                {prediction.description.length > 40
                  ? prediction.description.slice(0, 31) + "..."
                  : prediction.description}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Locator;