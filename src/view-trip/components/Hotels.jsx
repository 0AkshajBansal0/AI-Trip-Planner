import React from 'react'

const Hotels = ({trip}) => {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.hotels?.map((hotel,index)=>(
                <div>
                    <img src="/placeholder.webp" className='rounded-xl' />
                    <div className="my-2">
                        <h2 className="font-medium">{hotel.hotelName}</h2>
                        <h2 className="font-medium text-gray-500">{hotel.hotelAddress}</h2>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Hotels
