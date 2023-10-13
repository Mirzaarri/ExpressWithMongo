const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/login');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

//sign up api.. 
const signupUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body; // Add 'role' to the destructuring
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//login api
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id, role: user.role }, '8B196C12D3949FDB7BE7029DE4F16FAE', {
        expiresIn: '1h',
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// //forgot password
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const resetToken = generateResetToken();
//     user.token = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000;
//     await user.save();

//     const resetLink = `http://localhost:4000/loginsystem/resetpassword?token=${resetToken}`;
//     const mailOptions = {
//       from: process.env.credEmail,
//       to: user.email,
//       subject: 'Password Reset',
//       text: `Click the following link to reset your password: ${resetLink}`,
//     };

//     const transporter = nodemailer.createTransport({
//       host: 'smtp-mail.outlook.com',
//       port: 587,
//       secure: false, // TLS
//       auth: {
//         user: process.env.credEmail,
//         pass: process.env.credPassword,
//       },
// });

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Failed to send reset email' });
//       } else {
//         console.log('Email sent: ' + info.response);
//         res.status(200).json({ message: 'Password reset email sent successfully' });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// }

// const generateResetToken = () => {
//   const buffer = crypto.randomBytes(32);
//   const token = buffer.toString('hex');
//   return token;
// }


//reset password
// const resetPassword = async (req, res) => {
//   try {
//     const token = req.query.token;
//     const { newPassword } = req.body;
//     const user = await User.findOne({token: token, resetPasswordExpires: { $gt: Date.now() }});

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid or expired token'});
//     }

//     // Update the user's password
//     user.password = newPassword;
//     user.token = null;
//     user.resetPasswordExpires = null;
//     await user.save();

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

//forgot password using OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetOtp = generateOtp(4);
    user.otp = resetOtp;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetLink = `http://localhost:4000/loginsystem/resetpassword?otp=${resetOtp}`;
    const mailOptions = {
      from: "arslan.mirza14321@outlook.com",
      to: user.email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: "arslan.mirza14321@outlook.com",
        pass: "Arro14321",
      },
});

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to send reset email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Password reset email sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const generateOtp = (length) => {
  const characters = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    otp += characters[index];
  }

  return otp;
}


//reset password with OTP
const resetPassword = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole === 'user') {
    const otp = req.query.otp;
    const { newPassword } = req.body;
    const user = await User.findOne({otp: otp, resetPasswordExpires: { $gt: Date.now() }});

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired OTP'});
    }
    // Update the user's password
    user.password = newPassword;
    user.otp = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


const getAllData = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole === 'admin') {
      const users = await User.find({});
      res.status(200).json(users);
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole === 'admin') {
    const user = await User.findByIdAndDelete(req.params.id)
    res.json("user deleted successfully");
    }
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

const createuser = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole === 'admin') {
    const { username, email, password, role } = req.body; // Add 'role' to the destructuring
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {signupUser, loginUser, forgotPassword, resetPassword, getAllData, deleteUser, createuser}