require('dotenv').config();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userModel = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await userModel.save();

    res.status(201).json({
      success: true,
      message: 'Signup successful',
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Unable to signup',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email or password is incorrect',
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email or password is incorrect',
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '40m' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      jwtToken,
      email: user.email,
      name: user.name,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Unable to login',
    });
  }
};

module.exports = { signup, login };
