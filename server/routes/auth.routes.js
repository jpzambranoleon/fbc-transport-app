const router = require("express").Router();
const AuthController = require("../controllers/user.controller");
const { checkDuplicateEmail } = require("../middlewares/register.middleware");
const { validateToken } = require("../middlewares/validate.jwt.middleware");

// Register
router.post("/register", [checkDuplicateEmail], AuthController.register);
// Login
router.post("/login", AuthController.login);
// Send OTP
router.post("/send-otp", AuthController.sendOTP);
// Activate
router.post("/activate", AuthController.activate);
// Fotgot Password
router.post("/forgot", AuthController.forgotPassword);
// Reset Password
router.post("/reset", AuthController.resetPassword);
// Get Profile Data
router.get("/profile", validateToken, AuthController.getProfileData);

module.exports = router;
