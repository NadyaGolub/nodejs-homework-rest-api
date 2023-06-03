const { HttpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const { schemas } = require("../models/contactJoiSchema");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt",{skip, limit}).populate("owner", "email subscription");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = schemas.contactAddSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }
  const { _id: owner } = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { error } = schemas.contactAddSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const favoriteContact = async (req, res) => {
  const { contactId } = req.params;

  const { error } = schemas.favoriteSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(contact);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  favoriteContact: ctrlWrapper(favoriteContact),
  deleteContactById: ctrlWrapper(deleteContactById),
};
