const { HttpError } = require("../helpers");

const { Contact, schemas } = require("../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
        const result = await Contact.findById(contactId);
    if (!result) {
      throw new HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.contactAddSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const favoriteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
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
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  favoriteContact,
  deleteContactById,
};
