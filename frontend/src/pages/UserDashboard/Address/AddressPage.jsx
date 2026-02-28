import React, { useEffect, useState } from "react";
import AddressForm from "../../../components/AddressForm";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Home,
  Briefcase,
  Star,
} from "lucide-react";
import {
  useDeleteAddressMutation,
  useGetAddressQuery,
  useSetDefaultMutation,
  useUpdateAddressMutation,
} from "../../../Redux/Api/Address/AddressApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddressId } from "../../../Redux/Slices/addressIdSlice";

const AddressPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selecteAddress, setSelectedAddress] = useState(null);
  const { data } = useGetAddressQuery();
  const [deleteAddress] = useDeleteAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [setDefault] = useSetDefaultMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let addresses = data?.addresses || [];

  useEffect(() => {
    const defaultAddress = addresses.find((adr) => adr.isDefault);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress._id);
    }
    
  }, [addresses]);

  // Get icon based on address type
  const getTypeIcon = (type) => {
    return type === "Office" ? (
      <Briefcase className="w-5 h-5" />
    ) : (
      <Home className="w-5 h-5" />
    );
  };

  // Format address text for display
  const formatAddressText = (address) => {
    const lines = [
      address.Address,
      address.city,
      address.town,
      address.state,
      address.pincode,
    ].filter(Boolean);

    return lines.map((line, index) => <p key={index}>{line}</p>);
  };

  // Handle edit address
  const handleEditAddress = async (formData) => {
    try {
      console.log(formData);

      await updateAddress({
        addressId: editingAddress._id,
        data: formData,
      }).unwrap();
      toast.success("Address updated successfully");
    } catch (error) {
      console.log(error.data);
    }
  };

  // Handle delete address
  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id).unwrap();
      toast.success("Address deleted successfully");
    } catch (error) {
      console.log(error.data);
    }
  };

  // Handle set default address
  const handelContinue = () => {
    if (!selecteAddress) {
      toast.error("please select the address to continue");
      return;
    }

    dispatch(setAddressId(selecteAddress));
    

    navigate("/checkout/payment", { state: { addressId: selecteAddress } });
  };

  const handleSetDefault = async (id) => {
    try{
      await setDefault(id).unwrap();
      toast.success("Default address updated");
      // setSelectedAddress(id);

    }catch(error){
      console.log(error.data);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Address List */}
          <div className="lg:w-2/3">
            {/* Add New Address Button */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-black">
                  Your Addresses
                </h2>
                <div className="text-sm text-gray-500">
                  {addresses.length} addresses
                </div>
              </div>

              {!showAddForm && !editingAddress && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full group"
                >
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-black hover:bg-gray-50 transition-all duration-300">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg font-medium text-black">
                        Add New Address
                      </span>
                      <span className="text-gray-600 text-sm mt-1">
                        Create a new delivery address
                      </span>
                    </div>
                  </div>
                </button>
              )}

              {/* Add Address Form */}
              {showAddForm && !editingAddress && (
                <AddressForm
                  mode="add"
                  onCancel={() => setShowAddForm(false)}
                />
              )}

              {/* Edit Address Form */}
              {editingAddress && (
                <AddressForm
                  mode="edit"
                  initialData={editingAddress}
                  onCancel={() => setEditingAddress(null)}
                  onSubmit={handleEditAddress}
                />
              )}
            </div>

            {/* Address Cards */}
            <div className="space-y-6">
              {addresses.map((address) => (
                <div
                  onClick={() => setSelectedAddress(address._id)}
                  key={address._id}
                  className="relative"
                >
                  {address.isDefault && (
                    <div className="absolute -top-2 -left-2 bg-black text-white px-3 py-1 text-xs font-bold flex items-center gap-1 z-10">
                      <Star className="w-3 h-3 fill-white" />
                      DEFAULT
                    </div>
                  )}

                  <div
                    className={`border rounded-lg p-6 cursor-pointer
    ${
      selecteAddress === address._id
        ? "border-black ring-2 ring-black border"
        : "border-gray-300 hover:border-black"
    }
  `}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {getTypeIcon(address.addressType)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-black">
                            {address.fullName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.addressType} Address
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address._id)}
                            className="px-3 py-1 text-sm border border-gray-300 rounded hover:border-black hover:bg-gray-50 transition-colors duration-300"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => setEditingAddress(address)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address._id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-300"
                        >
                          <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
                        </button>
                      </div>
                    </div>

                    <div className="text-gray-600 space-y-2">
                      <p className="font-medium text-black">
                        {address.fullName}
                      </p>
                      <p>+91 {address.mobile}</p>
                      <div className="mt-4 space-y-1">
                        {formatAddressText(address)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {addresses.length === 0 && !showAddForm && (
                <div className="  p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="font-medium text-black mb-2">
                    No Addresses found
                  </h4>
                  <p className="text-gray-600 text-sm mb-6">
                    Add your first address to get started with shopping
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sticky Info Card */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              {/* Info Card */}
              <div className="border border-gray-300 rounded-lg p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-black">Address Tips</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black mb-1">
                        Default Address
                      </p>
                      <p className="text-xs text-gray-600">
                        Your default address is used for all deliveries unless
                        changed at checkout.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black mb-1">
                        Address Types
                      </p>
                      <p className="text-xs text-gray-600">
                        Use different addresses for home, work, or other
                        locations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black mb-1">
                        Accurate Information
                      </p>
                      <p className="text-xs text-gray-600">
                        Ensure phone numbers and landmarks are correct for
                        smooth deliveries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-black mb-4">Address Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Addresses</span>
                    <span className="text-lg font-bold text-black">
                      {addresses.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Default Address</span>
                    <span className="text-black font-medium">
                      {addresses.find((a) => a.isDefault)?.fullName || "None"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Home Addresses</span>
                    <span className="text-black font-medium">
                      {addresses.filter((a) => a.addressType === "Home").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Office Addresses</span>
                    <span className="text-black font-medium">
                      {
                        addresses.filter((a) => a.addressType === "Office")
                          .length
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div onClick={handelContinue} className="flex justify-center my-5">
                <button className="cursor-pointer w-full rounded-md bg-black text-white p-2.5">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <h3 className="text-lg font-medium text-black mb-6">
            How to Add Address
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-300 rounded-lg p-5">
              <div className="text-2xl font-light text-black mb-3">1</div>
              <h4 className="font-medium text-black mb-2">Click Add Address</h4>
              <p className="text-gray-600 text-sm">
                Click the "Add New Address" button above
              </p>
            </div>

            <div className="border border-gray-300 rounded-lg p-5">
              <div className="text-2xl font-light text-black mb-3">2</div>
              <h4 className="font-medium text-black mb-2">Fill Details</h4>
              <p className="text-gray-600 text-sm">
                Enter accurate address information
              </p>
            </div>

            <div className="border border-gray-300 rounded-lg p-5">
              <div className="text-2xl font-light text-black mb-3">3</div>
              <h4 className="font-medium text-black mb-2">Save & Use</h4>
              <p className="text-gray-600 text-sm">
                Save and select during checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
