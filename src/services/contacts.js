import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

export const createContact = (payload) => ContactsCollection.create(payload);

export const patchContact = (contactId, payload) =>
  ContactsCollection.findByIdAndUpdate(contactId, payload, { new: true });

export const deleteContact = (contactId) =>
  ContactsCollection.findByIdAndDelete(contactId);
