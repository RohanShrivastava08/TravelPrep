import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Plane } from 'lucide-react';
import { useChecklist } from '../context/ChecklistContext';
import { TripInfo as TripInfoType } from '../types';

const TripInfo: React.FC = () => {
  const { state, updateTripInfo } = useChecklist();
  const [isEditing, setIsEditing] = useState(!state.tripInfo);
  const [info, setInfo] = useState<TripInfoType>(state.tripInfo || {
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTripInfo(info);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 overflow-hidden"
    >
      <div className="relative rounded-xl overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg"
          alt="Travel background"
          className="w-full h-60 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {isEditing ? (
          <div className="absolute inset-0 bg-black/70">
            <form onSubmit={handleSubmit} className="h-full p-6 flex flex-col justify-center space-y-4">
              <input
                type="text"
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                placeholder="Trip Name"
                className="w-full px-4 py-2 rounded-lg border bg-white/10 border-white/20 text-white placeholder-white/60"
                required
              />
              <input
                type="text"
                value={info.destination}
                onChange={(e) => setInfo({ ...info, destination: e.target.value })}
                placeholder="Destination"
                className="w-full px-4 py-2 rounded-lg border bg-white/10 border-white/20 text-white placeholder-white/60"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={info.startDate}
                  onChange={(e) => setInfo({ ...info, startDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border bg-white/10 border-white/20 text-white"
                  required
                />
                <input
                  type="date"
                  value={info.endDate}
                  onChange={(e) => setInfo({ ...info, endDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
                >
                  Save Trip
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">{state.tripInfo?.name || "New Trip"}</h2>
                <div className="flex items-center space-x-4 text-sm opacity-90">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {state.tripInfo?.destination}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {state.tripInfo?.startDate} - {state.tripInfo?.endDate}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Plane className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TripInfo;