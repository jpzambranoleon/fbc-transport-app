const router = require("express").Router();
const MessageController = require("../controllers/message.controller");

// New Message
router.post("/", MessageController.newMessage);

// Get Messages of User
router.get("/:conversationId", MessageController.getMessage);

module.exports = router;
