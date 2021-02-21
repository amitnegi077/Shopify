const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signup, signout, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 chcaracters long"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast 5 char long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is required"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("Password field is required"),
  ],
  signin
);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res) => {
  res.send("A protected route");
});

module.exports = router;
