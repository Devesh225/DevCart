const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSingleUserDetails } = require('../controllers/userController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUserDetails);

module.exports = router;