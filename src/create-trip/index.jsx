import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 10 || formData?.noOfDays < 1 || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all the fields");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());

    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      // Dispatch a custom event when user logs in
      window.dispatchEvent(new Event("userLoggedIn"));
      OnGenerateTrip();
    });
  };

  return (
    <div>
      <div className="sm:px-10 md:px-20 lg:px-32 xl:px-56 px-5 mt-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-2xl sm:text-3xl text-gradient"
        >
          Tell us your travel preferences 🏕️
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-gray-500 text-lg sm:text-xl"
        >
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </motion.p>

        <div className="mt-10 sm:mt-20 flex flex-col gap-8 sm:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-lg sm:text-xl my-3 font-medium">What is destination of choice?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange('location', v);
                },
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-lg sm:text-xl my-3 font-medium">How many days are you planning your trip?</h2>
            <Input
              placeholder="Ex. 3"
              type="number"
              className="hover:ring-2 hover:ring-blue-400 focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 sm:mt-12"
        >
          <h2 className="text-lg sm:text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mt-5">
            {SelectBudgetOptions.map((items, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleInputChange('budget', items.title)}
                className={`p-4 border rounded-lg cursor-pointer transition-all transform hover:shadow-2xl hover:-translate-y-2
                ${formData?.budget === items.title && 'shadow-xl border-blue-500 bg-blue-50'}
              `}
                style={{
                  background: formData?.budget === items.title ? '#e3f2fd' : '#fff',
                  borderColor: formData?.budget === items.title ? '#2196f3' : '#e5e7eb',
                }}
              >
                <h2 className="text-4xl text-blue-500">{items.icon}</h2>
                <h2 className="font-bold text-lg mt-2 text-gray-800">{items.title}</h2>
                <h2 className="text-sm text-gray-500 mt-1">{items.desc}</h2>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 sm:mt-12"
        >
          <h2 className="text-lg sm:text-xl my-3 font-medium">Who do you plan on travelling with?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mt-5">
            {SelectTravelsList.map((items, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleInputChange('traveler', items.people)}
                className={`p-4 border rounded-lg cursor-pointer transition-all transform hover:shadow-2xl hover:-translate-y-2
                ${formData?.traveler === items.people && 'shadow-xl border-green-500 bg-green-50'}
              `}
                style={{
                  background: formData?.traveler === items.people ? '#e8f5e9' : '#fff',
                  borderColor: formData?.traveler === items.people ? '#4caf50' : '#e5e7eb',
                }}
              >
                <h2 className="text-4xl text-green-500">{items.icon}</h2>
                <h2 className="font-bold text-lg mt-2 text-gray-800">{items.title}</h2>
                <h2 className="text-sm text-gray-500 mt-1">{items.desc}</h2>
                <h2 className="text-sm text-gray-500 mt-1">(No. of People: {items.people})</h2>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="my-8 sm:my-10 flex justify-end"
        >
          <Button
            onClick={OnGenerateTrip}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transform transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none">
            {loading ? (
              <div className="flex items-center gap-2">
                <span>Please Wait...</span> <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
              </div>)
              : 'Generate Trip'
            }
          </Button>
        </motion.div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src="/TripPlanner.png"
                className="w-24 sm:w-32 mx-auto"
              />
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='font-bold text-lg sm:text-xl mt-7'
              >
                Sign In With Google
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm sm:text-base"
              >
                Sign in to the App with google authentication securely
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center justify-center">
                  <FcGoogle className='h-6 w-6 sm:h-7 sm:w-7' />
                  <span className="font-semibold text-sm sm:text-base">Sign in with Google</span>
                </Button>
              </motion.div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}