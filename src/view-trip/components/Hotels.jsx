import React from 'react';
import HotelCardItem from './HotelCardItem';

const Hotels = ({ trip }) => {
    return (
        <div className='mt-5'>
            <h2 className='font-bold text-2xl mb-6 text-center md:text-left'>
                Hotel Recommendations
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={hotel} />
                ))}
            </div>
        </div>
    );
};

export default Hotels;
