const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let refreshTokens = [];

const authController = {
  // =================== REGISTER ===================
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
        phone: req.body.phone,
        birthday: req.body.birthday,
        address: req.body.address,
        role: req.body.role||"user",        
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // =================== ACCESS TOKEN ===================
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },

  // =================== REFRESH TOKEN ===================
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  // =================== LOGIN ===================
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("Sai email!");
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json("Sai mật khẩu!");
      }

      const accessToken = authController.generateAccessToken(user);
      const refreshToken = authController.generateRefreshToken(user);

      refreshTokens.push(refreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // =================== REFRESH TOKEN REQUEST ===================
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json("Bạn chưa đăng nhập!");

    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token không hợp lệ!");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json("Refresh token hết hạn hoặc không hợp lệ!");
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

   
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);

      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  // =================== LOGOUT ===================
  userLogout: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("Đăng xuất thành công!");
  },
};

module.exports = authController;
