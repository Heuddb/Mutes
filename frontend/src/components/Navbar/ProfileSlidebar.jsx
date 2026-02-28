import {
  User,
  X,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import ProfileOptionItem from "./ProfileOptionItem";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Slices/authSlice";
import { profileOptionsLoggedIn, profileOptionsGuest } from "./constants";

const ProfileSidebar = ({
  isOpen,
  onClose,
  isAuthenticated,
  user,
  onLogout,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileAction = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate("/");
  };

  return (
    <>
      {/* Backdrop with blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto scrollbar-hide ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 hover:opacity-70 transition-opacity duration-300"
          >
            <X className="w-7 h-7 text-gray-800" />
          </button>

          <div className="mt-16">
            {isAuthenticated ? (
              // Logged-in User View
              <>
                {/* User Profile Section */}
                <div className="flex items-center gap-4 p-4 border-b border-gray-200 pb-6">
                  <div className="min-w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h6 className="text-md font-medium text-gray-900">
                      {user?.name}
                    </h6>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>
                </div>

                {/* Profile Options for Logged-in Users */}
                <div className="mt-6 space-y-1">
                  {profileOptionsLoggedIn.map((option, index) => (
                    <ProfileOptionItem
                      key={index}
                      icon={option.icon}
                      label={option.label}
                      onClick={() => handleProfileAction(option.path)}
                    />
                  ))}
                </div>

                {/* Logout Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 w-full py-4 px-4 rounded-lg hover:bg-red-50 cursor-pointer transition-colors duration-200 group"
                  >
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-200">
                      <LogOut className="w-5 h-5 text-red-600" />
                    </div>
                    <span className="text-red-600 font-medium group-hover:text-red-700 transition-colors duration-200">
                      Logout
                    </span>
                  </button>
                </div>
              </>
            ) : (
              // Guest/Unauthenticated User View
              <>
                {/* Welcome Message */}
                <div className="flex flex-col items-center p-4 border-b border-gray-200 pb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                    <User className="w-10 h-10 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Welcome to MUTES
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Sign in to access your orders, coupons, and more
                  </p>
                </div>

                {/* Quick Actions for Guests */}
                <div className="mt-6 space-y-1">
                  {profileOptionsGuest.map((option, index) => (
                    <ProfileOptionItem
                      key={index}
                      icon={option.icon}
                      label={option.label}
                      onClick={() => handleProfileAction(option.path)}
                    />
                  ))}
                </div>

                {/* Auth Buttons */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => handleProfileAction("/auth/login")}
                    className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-black text-white hover:bg-gray-900 cursor-pointer transition-colors duration-200 group"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="font-medium">Sign In</span>
                  </button>
                  <button
                    onClick={() => handleProfileAction("/auth/sign-up")}
                    className="flex items-center justify-center gap-3 w-full py-3.5 px-4 border-2 border-black text-black hover:bg-gray-50 cursor-pointer transition-colors duration-200 group"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span className="font-medium">Create Account</span>
                  </button>
                </div>

                {/* Guest Note */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    As a guest, you can still add items to cart and favorites.
                    Sign up to save them permanently!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;