import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;


// {
// 	"name": "test",
// 	"description": "test",
// 	"address": "test",
// 	"regularPrice": "500",
// 	"discountPrice":5,
// 	"bathrooms":5,
// 	"bedrooms": 7,
// "furnished": true,
// 	"parking ": true,
// 	"type" : "rent",
// 	"offer ": true,
// 	"imageUrls": ["djjc","djwjdsdj"],
// "userRef":"djwshcjadhkjah87"
	
// }