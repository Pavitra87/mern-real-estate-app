const listModel = require("../models/listModel");
const errorHandler = require("../utils/error");

//create list
const createListingController = async (req, res, next) => {
  try {
    const listing = await listModel.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

//get list
const getListingController = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await listModel.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "you can only view your own listings"));
  }
};


//delete list
const deleteListingController = async (req, res, next) => {
  const listing = await listModel.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete ypur own listings!"));
  }

  try {
    await listModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted')
  } catch (error) {
    next(error);
  }
};


//update list
const updateListingController=async(req,res,next)=>{
  const listing=await listModel.findById(req.params.id)
  if(!listing){
    return next(errorHandler(404,'Listing not found'))
  }
  if(req.user.id !== listing.userRef){
    return next(errorHandler(401,'You can only update your own listing'))
  }
  try {
   const updatelisting= await listModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
   )
   res.status(200).json(updatelisting)
  } catch (error) {
    next(error)
  }
}


const getListing=async(req,res,next)=>{
try {
  const listing=await listModel.findById(req.params.id)
  if(!listing){
    return next(errorHandler(404,'Listing not found'))
  }
  res.status(200).json(listing)
} catch (error) {
  next(error)
}
}

const getListings=async(req,res,next)=>{
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await listModel.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createListingController,
  getListingController,
  deleteListingController,
  updateListingController,
  getListing,
  getListings
};
