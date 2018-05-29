// ./express-server/routes/todo.server.route.js
import express from 'express';
//import controller file
import * as contactsController from '../controllers/contacts.server.controller';
// get an instance of express router
const router = express.Router();
router.route('/')
     .get(contactsController.getContacts)
     .post(contactsController.addContact)
     .put(contactsController.updateContact);
router.route('/:id')
      .get(contactsController.getContact)
      .delete(contactsController.deleteContact);
export default router;
