import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-8">
      <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-6">Places To Visit</h2>

      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} className="mt-8">
            <h2 className="font-medium text-lg sm:text-xl text-gray-800">{item.day}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {item.plan.map((place, index) => (
                <div key={index} className="transition-transform transform hover:scale-105">
                  <h2 className="font-medium text-sm text-orange-600">{place.bestTime}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
