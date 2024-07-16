import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUser = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.find({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, user, "Users fetched"));
  } catch (error) {
    throw new ApiError(404, "User not found");
  }
});

export { getUser };
