import express from 'express';
// import { env } from './utils/env.js';
import pino from 'pino-http';
import cors from 'cors';
import mongoose from 'mongoose';
import { getAllContacts, getContactById } from './services/contacts.js';

// const PORT = Number(env('PORT', '3000'));
const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: res.statusCode,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(404).json({
        status: 404,
        message: `Invalid Id format`,
      });
    }

    try {
      const contact = await getContactById(contactId);

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (err) {
      console.error(err);
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
