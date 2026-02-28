const AddressModel = require("../model/AddressModel");

let getAddress = async (req, res, next) => {
  try {
    const user = req.user?.id || null;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    let addressDoc = await AddressModel.findOne({ user });

    if (!addressDoc) {
      return res
        .status(400)
        .json({ success: false, message: "address not found" });
    }

    return res
      .status(200)
      .json({ success: true, addresses: addressDoc.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let AddAddress = async (req, res, next) => {
  try {
    const user = req.user?.id || null;
    const { data } = req.body;

    if (!data || data == null || typeof data !== "object") {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    let addressDoc = await AddressModel.findOne({ user });

    if (!addressDoc) {
      addressDoc = await AddressModel.create({
        user,
        addresses: [data],
      });

      return res
        .status(200)
        .json({ success: true, message: "address added successfully" });
    }

    const duplicate = addressDoc.addresses.find(
      (addr) =>
        addr.mobile === data.mobile &&
        addr.pincode === data.pincode &&
        addr.Address === data.Address &&
        addr.town === data.town &&
        addr.city === data.city &&
        addr.state === data.state,
    );

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Address already exists",
      });
    }

    if (data.isDefault) {
      addressDoc.addresses.forEach((p) => (p.isDefault = false));
    }

    addressDoc.addresses.push(data);
    await addressDoc.save();

    return res.status(200).json({
      success: true,
      address: addressDoc,
      message: "Address added successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let deleteAddress = async (req, res, next) => {
  try {
    const user = req.user?.id || null;

    const { addressId } = req.body;

    if (!addressId || addressId == null) {
      return res.status(400).json({
        success: false,
        message: "addressId is required",
      });
    }

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    let addressDoc = await AddressModel.findOne({ user });

    if (!addressDoc) {
      return res
        .status(400)
        .json({ success: false, message: "address not found" });
    }

    let deletedAddress = addressDoc.addresses.find(
      (adr) => adr._id.toString() === addressId,
    );

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    addressDoc.addresses = addressDoc.addresses.filter(
      (adr) => adr._id.toString() !== addressId.toString(),
    );

    if (deletedAddress.isDefault && addressDoc.addresses.length > 0) {
      addressDoc.addresses[0].isDefault = true;
    }

    await addressDoc.save();

    return res
      .status(200)
      .json({ success: true, message: "address deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


let setDefaultAddress = async (req,res,next)=>{
  try{
    const user = req.user?.id || null;

    if(!user){
      return res.status(400).json({success:false, message:"user not found"})
    }

    const {addressId} = req.body;

    if(!addressId || addressId === null){
      return res.status(400).json({success:false, message:"addressId is required"})
    }

    let addressDoc = await AddressModel.findOne({user});

    if(!addressDoc){
      return res.status(400).json({success:false, message:"address not found"})
    }

    let defaultAddress = addressDoc.addresses.find((adr)=> adr._id.toString() === addressId.toString());

    if(!defaultAddress){
      return res.status(404).json({success:false, message:`address not found ${addressId}` })
    }

    addressDoc.addresses.forEach((adr)=>adr.isDefault = false);

    defaultAddress.isDefault = true;

    await addressDoc.save();
    return res.status(200).json({success:true, message:"default address set successfully"})

  }catch(error){
    res.status(500).json({ success: false, message: error.message });
  }
}



let updateAddress = async (req, res, next) => {
  try {
    const user = req.user?.id || null;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const { addressId , data } = req.body;

    if (!addressId || !data) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let addressDoc = await AddressModel.findOne({ user });

    if (!addressDoc) {
      return res.status(200).json({
        success: false,
        message: "address not found",
      });
    }

    const addressIds = addressDoc.addresses.id(addressId);

    if (!addressIds) {
      return res.status(404).json({
        success: false,
        message: "address not found",
      });
    }

    if (data.isDefault) {
      addressDoc.addresses.forEach((adr) => (adr.isDefault = false));
    }

    Object.assign(addressIds, data);

    await addressDoc.save();

    return res.status(200).json({
      success: true,
      message: "address updated successfully",
      address: addressDoc,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAddress,
  AddAddress,
  deleteAddress,
  setDefaultAddress,
  updateAddress,
};
