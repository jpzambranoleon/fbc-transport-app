const router = require("express").Router();
const PostController = require("../controllers/post.controller");

// Submit a Post
router.post("/submit", PostController.submitPost);
// Update a Post
router.put("/update/:id", PostController.updatePost);
// Delete a Post
router.delete("/delete/:id", PostController.deletePost);
// Get all posts
router.get("/get_all", PostController.getAll);
// Get all user's posts
router.get("/my_posts/:username", PostController.getAllUsersPost);

// Get a Post
router.get("/get/:id", PostController.getPost);

module.exports = router;
