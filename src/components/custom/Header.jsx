import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { MdMenu } from "react-icons/md";
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {

  // Navbar responsive state
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const handleUserLogin = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };
    // Listen for the login event
    window.addEventListener("userLoggedIn", handleUserLogin);
    return () => {
      window.removeEventListener("userLoggedIn", handleUserLogin);
    };
  }, []);

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  // Get User Profile
  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    });
  };

  return (
    <div className="p-4 shadow-md flex justify-between items-center px-6">
      <a href="/">
        <img
          src="/TripPlanner.png"
          alt="Logo"
          className="h-10 md:h-12 lg:h-14 w-auto" // Adjust the height for different screen sizes
        />
      </a>
      <div className="flex items-center gap-4">
        {user ? (
          <div className='hidden md:flex items-center gap-4'>
            <a href='/create-trip'>
              <Button variant="outline" className="rounded-full px-6 py-2">+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
              <Button variant="outline" className="rounded-full px-6 py-2">My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-9 w-9 rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <a href='/'>
                  <h2 className='cursor-pointer' onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>Logout</h2>
                </a>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* Dialog for Google Sign-In */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/TripPlanner.png" className="mb-5" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in securely using Google authentication</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center justify-center">
                <FcGoogle className='h-7 w-7' />
                <span className="font-semibold">Sign in with Google</span>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Navbar responsive toggle */}
      <div className='md:hidden' onClick={() => setOpen(!open)}>
        <MdMenu className='text-4xl cursor-pointer' />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence mode="wait" open={open}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className='absolute top-20 left-0 w-full h-screen bg-white shadow-lg z-20'
          >
            <div className='text-xl font-semibold uppercase bg-orange-500 text-white py-10 m-4 rounded-3xl'>
              <ul className='flex flex-col gap-8 items-center justify-center'>
                <li className='flex items-center gap-3'>
                  <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
                  <h2>{user?.name}</h2>
                </li>
                <a href='/create-trip'>
                  <li>+ Create Trip</li>
                </a>
                <a href='/my-trips'>
                  <li>View Trips</li>
                </a>
                <li><a href='/'><h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2></a></li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
