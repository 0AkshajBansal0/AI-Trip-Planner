import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

const Viewtrip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    const GetTripData = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'AITrips', tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTrip(docSnap.data());
            } else {
                toast('No trip Found!');
            }
        } catch (error) {
            console.error('Error fetching trip data:', error);
            toast('Failed to load trip data!');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-12 text-xl">Loading trip details...</div>;
    }

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8">
            <div className="space-y-10">
                {/* Info Section */}
                <div className="mb-10">
                    <InfoSection trip={trip} />
                </div>

                {/* Hotels Section */}
                <div className="mb-10">
                    <Hotels trip={trip} />
                </div>

                {/* Places to Visit Section */}
                <div className="mb-10">
                    <PlacesToVisit trip={trip} />
                </div>

                {/* Footer */}
                <div>
                    <Footer trip={trip} />
                </div>
            </div>
        </div>
    );
};

export default Viewtrip;