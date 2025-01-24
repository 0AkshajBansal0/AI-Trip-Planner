import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';

export default function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData,setFormData] = useState([]);

  const handleInputChange = (name, value)=>{
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(()=>{
    console.log(formData)
  },[formData])

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className="text-xl my-3 font-medium">What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {setPlace(v); handleInputChange('location',v)},
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input placeholder={'Ex. 3'} type="number" />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((items, index) => (
            <div
              key={index}
              className='p-4 border rounded-lg cursor-pointer transition-all transform hover:shadow-xl hover:-translate-y-1'
              style={{
                borderColor: '#e5e7eb',
                backgroundColor: '#f9fafb',
              }}
            >
              <h2 className='text-4xl'>{items.icon}</h2>
              <h2 className='font-bold text-lg mt-2 text-gray-800'>{items.title}</h2>
              <h2 className='text-sm text-gray-500 mt-1'>{items.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl my-3 font-medium">Who do you plan on travelling with?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((items, index) => (
            <div
              key={index}
              className='p-4 border rounded-lg cursor-pointer transition-all transform hover:shadow-xl hover:-translate-y-1'
              style={{
                borderColor: '#e5e7eb',
                backgroundColor: '#f9fafb',
              }}
            >
              <h2 className='text-4xl'>{items.icon}</h2>
              <h2 className='font-bold text-lg mt-2 text-gray-800'>{items.title}</h2>
              <h2 className='text-sm text-gray-500 mt-1'>{items.desc}</h2>
            </div>
          ))}
        </div>
      </div>
            <div className='my-10 flex justify-end'>
              <Button>Generate Trip</Button>
            </div>
    </div>
  );
}
