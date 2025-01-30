import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        };
        const result = await GetPlaceDetails(data).then(resp => {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        });
    };

    return (
        <Link to={"https://www.google.com/maps/search/?api=1&query=" + hotel?.hotelName + ", " + hotel?.hotelAddress} target="_blank">
            <div className='hover:scale-105 transition-transform cursor-pointer'>
                <div className="relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg border border-white/20 hover:border-white/50 transition-all duration-300">
                    <img 
                        src={photoUrl ? photoUrl : "/placeholder.webp"} 
                        className='h-[180px] w-full object-cover transition-transform transform hover:scale-105' 
                        alt={hotel?.hotelName} 
                    />
                    <div className="my-2 flex flex-col gap-2 p-4">
                        <h2 className="font-medium text-black">{hotel?.hotelName}</h2>
                        <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                        <h2 className='text-sm text-black'>💰 {hotel?.price}</h2>
                        <h2 className='text-sm text-black'>⭐ {hotel?.rating} stars</h2>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
