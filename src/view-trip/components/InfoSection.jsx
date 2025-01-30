import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    };
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <img
        src={photoUrl ? photoUrl : "/placeholder.webp"}
        className="h-[340px] w-full object-cover rounded-xl transform hover:scale-105 transition-transform duration-300"
      />
      <div className="p-6 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg -mt-10 relative z-10 shadow-xl">
        <div className="text-white flex flex-col sm:flex-row justify-between items-start sm:items-center sm:gap-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="font-bold text-2xl sm:text-3xl">{trip?.userSelection?.location?.label}</h2>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <h2 className="p-2 px-4 bg-white text-gray-800 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:bg-gray-100 transition-colors">
                🗓️ {trip?.userSelection?.noOfDays} Days
              </h2>
              <h2 className="p-2 px-4 bg-white text-gray-800 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:bg-gray-100 transition-colors">
                💰 {trip?.userSelection?.budget} Budget
              </h2>
              <h2 className="p-2 px-4 bg-white text-gray-800 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:bg-gray-100 transition-colors">
                🧳 No. Of Travelers: {trip?.userSelection?.traveler}
              </h2>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white px-5 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all mt-4 sm:mt-0">
            <IoIosSend />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
