const router = require("express").Router();
const ConversationConroller = require("../controllers/conversation.controller");

// New Conversation
router.post("/", ConversationConroller.newConversation);

// Get Conversation of a User
router.get("/:userId", ConversationConroller.getConversation);

module.exports = router;
