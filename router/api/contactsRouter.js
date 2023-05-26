const express = require("express");

const contactsController = require("../../controllers/contactsController");
const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post("/", validateBody(schemas.contactAddSchema), contactsController.addContact);

router.put("/:contactId", isValidId, validateBody(schemas.contactAddSchema), contactsController.updateContactById);

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.favoriteSchema), contactsController.favoriteContact);

router.delete("/:contactId", isValidId, contactsController.deleteContactById);

module.exports = router;
