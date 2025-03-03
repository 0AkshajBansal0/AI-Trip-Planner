import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
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
    <Link to={'/view-trip/' + trip?.id}>
      <div className='hover:scale-105 transition-all'>
        {/* Fixed size container for the image */}
        <div className="w-full h-48 overflow-hidden rounded-xl">
          <img 
            src={photoUrl ? photoUrl : '/placeholder.webp'} 
            className="object-cover w-full h-full" 
            alt={trip?.userSelection?.location?.label} 
          />
        </div>
        <div className="mt-2">
          <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
          <h2 className='text-sm text-gray-500'>{trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;