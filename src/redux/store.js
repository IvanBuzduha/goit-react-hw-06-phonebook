import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer, filterReducer } from "./phonebook/phonebookReducer";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});
const store = configureStore({ reducer: rootReducer });
export default store;
