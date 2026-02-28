const WishlistModel = require("../model/WishlistModel");
const mongoose = require

 let wishlistAuth = async(guestId,user)=>{

    // Handle wishlist merging - FIXED VERSION
        try {
          if (guestId && guestId !== 'undefined' && guestId !== 'null') {
            const guestWishlist = await WishlistModel.findOne({ guestId });
            const userWishlist = await WishlistModel.findOne({ user: user._id });
    
            if (guestWishlist && guestWishlist.products.length > 0) {
              if (!userWishlist) {
                // Create user wishlist from guest wishlist
                await WishlistModel.create({
                  user: user._id,
                  products: guestWishlist.products,
                  guestId: null
                });
                await WishlistModel.deleteOne({ _id: guestWishlist._id });
              } else {
                // Merge guest wishlist into user wishlist
                const mergedProducts = new Set([
                  ...userWishlist.products.map(id => id.toString()),
                  ...guestWishlist.products.map(id => id.toString())
                ]);
                
                userWishlist.products = Array.from(mergedProducts).map(id => 
                  mongoose.Types.ObjectId.isValid(id) ? id : null
                ).filter(id => id !== null);
                
                await userWishlist.save();
                await WishlistModel.deleteOne({ _id: guestWishlist._id });
              }
            }
          }
        } catch (wishlistError) {
          console.error('Wishlist merge error:', wishlistError);
          // Don't fail authentication due to wishlist error
        }

}

module.exports= wishlistAuth;