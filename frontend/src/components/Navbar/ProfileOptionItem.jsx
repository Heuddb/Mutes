import { ChevronRight } from "lucide-react";

const ProfileOptionItem = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 group w-full text-left"
    >
      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
        <Icon className="w-5 h-5 text-gray-700 group-hover:text-black" />
      </div>

      <span className="text-gray-700 group-hover:text-black transition-colors duration-200 flex-1">
        {label}
      </span>

      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
    </button>
  );
};

export default ProfileOptionItem;