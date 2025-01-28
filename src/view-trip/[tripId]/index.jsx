import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';

const Viewtrip = () => {

    const {tripId}=useParams();
    const [trip,setTrip]=useState();
    useEffect(() => {
        tripId&&GetTripData();
    }, [tripId])
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef)

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data())
        }
        else{
            console.log("No such Document");
            toast('No trip Found!')
        }
    }
  return (
    <div className='pd-12 md:px-25 lg:px-44 xl:px-56'>
            <InfoSection trip={trip}/>
            <Hotels trip={trip}/>
            <PlacesToVisit trip={trip}/>
        {/*Footer*/}
    </div>
  )
}

export default Viewtrip
