import mongoose from 'mongoose';
import createHttpError from 'http-errors';

import { getAllContacts, getContactById } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: res.statusCode,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdControllers = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(404).json({
      status: 404,
      message: `Invalid Id format`,
    });
  }

  const contact = await getContactById(contactId);

  if (!contact) {
    next(createHttpError(404, `Contact with id ${contactId} not found`));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
