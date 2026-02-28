import { Star } from "lucide-react";

const reviews = [
  { name: "Sarah", rating: 5, comment: "Amazing quality!" },
  { name: "Mike", rating: 4, comment: "Good but size runs small." },
];

const Reviews = () => {
  return (
    <div className="space-y-8">
      {reviews.map((r, i) => (
        <div key={i} className="border-b pb-8">
          <p className="font-medium text-sm">{r.name}</p>
          <div className="flex">
            {[...Array(5)].map((_, j) => (
              <Star
                key={j}
                className={`w-3 h-3 ${
                  j < r.rating
                    ? "fill-gray-900 text-gray-900"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
