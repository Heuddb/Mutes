import React, { useState } from "react";
import { useAddAddressMutation } from "../Redux/Api/Address/AddressApi";
import toast from "react-hot-toast";

const AddressForm = ({
  mode, // "add" | "edit"
  initialData = {},
  onCancel,
  onSubmit
}) => {
  const [addressType, setAddressType] = useState(
    initialData.addressType || "Home",
  );

  console.log(mode)

  const [addAddress, { isloading, isSuccess, isError }] =
    useAddAddressMutation();

    const extractFormData = (e) => {
  const formData = new FormData(e.target);
  return {
    addressType,
    fullName: formData.get("fullName"),
    mobile: formData.get("mobile"),
    pincode: formData.get("pincode"),
    Address: formData.get("Address"),
    city: formData.get("city"),
    town: formData.get("town"),
    state: formData.get("state"),
    isDefault: formData.get("isDefault") === "on",
  };
};

const handleEditSubmit = (e) => {
  e.preventDefault();
  const data = extractFormData(e);
  
  onSubmit(data); // ⬅️ send clean data to parent
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const data = {
        addressType,
        fullName: formData.get("fullName"),
        mobile: formData.get("mobile"),
        pincode: formData.get("pincode"),
        Address: formData.get("Address"),
        city: formData.get("city"),
        town: formData.get("town"),
        state: formData.get("state"),
        isDefault: formData.get("isDefault") === "on",
      };


      await addAddress({ data: data }).unwrap();
      toast.success("Address added successfully");
      onCancel();
    } catch (error) {
      console.log(error);
      console.log(error.data.message);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 mb-6">
      <h3 className="font-bold text-black text-lg mb-6 pb-3 border-b">
        {mode === "add" ? "Add New Address" : "Edit Address"}
      </h3>

      <form onSubmit={mode === "add" ? handleSubmit: handleEditSubmit } className="space-y-4">
        {/* Address Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Type
          </label>
          <div className="flex gap-2">
            {["Home", "Office"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setAddressType(type)}
                className={`flex-1 py-2 border rounded text-sm transition-colors ${
                  addressType === type
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            defaultValue={initialData.fullName || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            name="mobile"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pincode *
          </label>
          <input
            type="text"
            name="pincode"
            pattern="[0-9]{6}"
            maxLength={6}
            inputMode="numeric"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <textarea
            rows="4"
            name="Address"
            defaultValue={initialData.Address || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black"
          />
        </div>

        {/* City / Town / State in a 2‑column grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              defaultValue={initialData.city || ""}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Town *
            </label>
            <input
              type="text"
              name="town"
              defaultValue={initialData.town || ""}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              name="state"
              defaultValue={initialData.state || ""}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-black"
            />
          </div>
          {/* Pincode already added above – this extra cell keeps grid alignment */}
          <div></div>
        </div>

        {/* Default Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isDefault"
            id="isDefault"
            defaultChecked={initialData.isDefault || false}
            className="w-4 h-4"
          />
          <label htmlFor="isDefault" className="text-sm text-gray-700">
            Set as default address
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            type="submit"
            className="flex-1 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            {mode === "add" ? "Save Address" : "Update Address"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
