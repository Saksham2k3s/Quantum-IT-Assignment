const UserModel = require("../models/userModel");
const catchAsyncError = require("../middleware/asyncErrorHandler.js");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// User Registration
exports.userRegister = catchAsyncError(async (req, res) => {
  // Destructure the incoming request body
  const { username, email, password, dob } = req.body;

  try {
    // If User doesn't provide all required fields
    if ( !username || !email || !password || !dob) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required!",
      });
    }

    // Check if user already exists with the given email
    const anotherUserWithEmail = await UserModel.findOne({ email });

    if (anotherUserWithEmail) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Check if user already exists with the given username
    const anotherUserWithUsername = await UserModel.findOne({ username });
    if (anotherUserWithUsername) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this username",
      });
    }

    // Hash the Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      dob,
    });

    // Generate Token and respond
    generateToken(user, 201, res);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Network Error!",
    });
  }
});

//User Login

exports.userLogin = catchAsyncError(async (req, res) => {
  console.log("Inside user login");
  console.log(req.body);
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Incorrect email or password.",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    console.log("Compare pass",comparePassword);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    generateToken(user, 201, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in login user",
    });
  }
});


//Get Other User Profile

exports.getUserInfo = catchAsyncError(async (req, res) => {
  const userId = req.params.id;

  // Find user with this id
  const user = await UserModel.findById(userId);
  if (!user) {
    console.log("User not found");
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User Details",
    user: user,
  });
});

//Get Profile
exports.getUserProfile = catchAsyncError(async (req, res) => {
  const id = req.id;

  const user = await UserModel.findById(id);

  return res.status(200).json({
    success: true,
    message: "User Details",
    user: user,
  });
});


// Get All Users
exports.getAllUsers = catchAsyncError(async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await UserModel.find().sort({ points: -1 });

    //no users found
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    // list of all users
    return res.status(200).json({
      success: true,
      message: "List of all users",
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
});

//Logout
exports.logout = catchAsyncError(async(req,res) => {
  res.cookie("token", null, {
    expires : new Date(Date.now()),
    httpOnly: true
  })
  return res.status(200).json({
     success: true,
     message: "Logout Successfully!"
  })
})
