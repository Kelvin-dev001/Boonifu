"use client";
import { useEffect, useState } from "react";
import { getUserPosters } from "../utils/getUserPoster";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

export default function MyPostersGallery() {
  const { user } = useFirebaseAuth();
  const [posters, setPosters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getUserPosters(user)
      .then(setPosters)
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return <div className="text-center py-8">Please log in to view your posters.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 text-boonifu-gold">My Posters</h2>
      {loading ? (
        <div>Loading...</div>
      ) : posters.length === 0 ? (
        <div className="text-gray-500">No posters yet. Start creating!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posters.map((poster) => (
            <div key={poster.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <img
                src={poster.imageUrl}
                alt={poster.message}
                className="w-full max-w-xs rounded mb-2"
              />
              <div className="font-semibold text-center">{poster.business}</div>
              <div className="text-sm text-gray-500 text-center">{poster.message}</div>
              <div className="text-xs mt-2 text-gray-400">{poster.vibe}</div>
              <div className="text-xs text-gray-400 mt-2">
                {poster.createdAt?.toDate
                  ? new Date(poster.createdAt.toDate()).toLocaleString()
                  : ""}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}