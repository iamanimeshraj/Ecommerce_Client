import React from "react";
import { Star } from "lucide-react";

const Reviews = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-16">
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-full mb-4">
        <Star className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">My Reviews</h2>
      <p className="text-gray-600 max-w-md">
        Review feature is <span className="font-semibold">coming soon</span>! You'll be able to rate products and share your experiences.
        <br />Stay tuned 🚀
      </p>
    </div>
  );
};

export default Reviews;
