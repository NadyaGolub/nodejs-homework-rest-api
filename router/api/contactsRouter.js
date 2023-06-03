const express = require("express");

const contactsController = require("../../controllers/contactsController");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contactJoiSchema");

const router = express.Router();

router.get("/", authenticate, contactsController.getAllContacts);

router.get("/:contactId", authenticate, isValidId, contactsController.getContactById);

router.post("/", authenticate, validateBody(schemas.contactAddSchema), contactsController.addContact);

router.put("/:contactId", authenticate, isValidId, validateBody(schemas.contactAddSchema), contactsController.updateContactById);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(schemas.favoriteSchema), contactsController.favoriteContact);

router.delete("/:contactId", authenticate, isValidId, contactsController.deleteContactById);

module.exports = router;
