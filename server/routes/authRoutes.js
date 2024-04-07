const express = require("express");

const authHandler = require("./../handlers/authHandlers");

const catchASync = require("./../utils/catchASync");
const router = express.Router();

//router.param("id", employeeHandler.checkID);

router.route("/signup").post(catchASync(authHandler.signup));
router.route("/login").post(catchASync(authHandler.login));

router.route("/forgotpassword").post(authHandler.forgotPassword);
router.route("/resetpassword/:token").patch(authHandler.resetPassword);
router.route("/updatepassword").patch(authHandler.updatePassword);
router.get("/protect", authHandler.protect, (req, res) => {
  // This route is protected by the 'protect' middleware
  // Only authenticated users with valid tokens can access it
  res.status(200).json({
    access: "true",
    message: "Protected endpoint accessed.",
  });
});

router.post(
  "/restrictTo",
  catchASync(async (req, res, next) => {
    const { roleNames } = req.body;

    try {
      // Call the restrictTo function from authHandler
      await authHandler.restrictTo(req, res, next, ...roleNames);

      // If execution reaches here, it means the user has permission
      res.status(200).json({
        permission: true,
        message: "User has permission.",
      });
    } catch (error) {
      console.error("Error in restrictTo:", error);
      // If there's an error, handle it and send an appropriate response
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  })
);

module.exports = router;
