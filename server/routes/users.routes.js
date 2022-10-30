const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const { validateToken } = require("../middlewares/validate.jwt.middleware");

router.put("/set", UserController.setPublicInfo);
// UPDATE USER
router.put("/update/:id", UserController.updateUser);
// UPDATE USERNAME
router.put("/update/username/:id", UserController.updateUsername);
// CHANGE PASSWORD
router.put("/update/password/:id", UserController.changePassword);
// DELETE USER
router.delete("/delete/:id", UserController.deleteUser);
// GET USER
router.get("/", UserController.getUser);

router.get("/profile", validateToken, UserController.getProfileData);

module.exports = router;
