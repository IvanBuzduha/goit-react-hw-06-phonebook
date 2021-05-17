import { createReducer } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  getAllContacts,
  setFilter,
} from "./phonebookActions";

const contactsReducer = createReducer([], {
  [getAllContacts]: (_, { payload }) => payload,
  [addContact]: (state, { payload }) => [...state, payload],
  [deleteContact]: (state, { payload }) => [
    ...state.filter((contact) => contact.id !== payload),
  ],
});
const filterReducer = createReducer("", {
  [setFilter]: (_, { payload }) => payload,
});

export { contactsReducer, filterReducer };
