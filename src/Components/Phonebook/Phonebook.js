import React, { Component } from "react";
import PhoneFilter from "./PhoneFilter/PhoneFilter";
import PhoneForm from "./PhoneForm/PhoneForm";
import PhoneList from "./PhoneList/PhoneList";
import axios from "axios";
import { connect } from "react-redux";
import {
  addContact,
  deleteContact,
  getAllContacts,
  setFilter,
} from "../../redux/phonebook/phonebookActions";

class Phonebook extends Component {
  // state = {
  // contacts: [],
  // filter: "",
  // };
  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://phonebook-20-default-rtdb.firebaseio.com/contacts.json`
      );
      if (data) {
        const contacts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        this.props.getAllContacts(contacts);
        // this.setState({ contacts });
      }

      console.log(data);
    } catch (error) {}
  }

  addContact = async (contact) => {
    const someName = this.props.contacts
      // const someName = this.state.contacts
      .map((cont) => cont.name.toLowerCase())
      .includes(contact.name.toLowerCase());
    const someNum = this.props.contacts
      // const someNum = this.state.contacts
      .map((cont) => cont.number)
      .includes(contact.number);
    if (someName) {
      alert(`${contact.name} is already in contacts`);
      return;
    } else if (someNum) {
      alert(`${contact.number} is already in contacts`);
      return;
    }
    // try {
    const { data } = await axios.post(
      `https://phonebook-20-default-rtdb.firebaseio.com/contacts.json`,
      contact
    );
    this.props.addContact({ ...contact, id: data.name });
    // this.setState((prevState) => {
    //   return {
    //     contacts: [...prevState.contacts, { ...contact, id: data.name }],
    //   };
    // });
    // console.log(data);
    // } catch (error) {}
  };
  deleteContact = async (e) => {
    // try {
    const { id } = e.target;
    await axios.delete(
      `https://phonebook-20-default-rtdb.firebaseio.com/contacts/${id}.json`
    );
    this.props.deleteContact(id);
    // this.setState({
    //   contacts: this.state.contacts.filter((contact) => contact.id !== id),
    // });
    // } catch (error) {}
  };
  setFilter = (e) => {
    const { value } = e.target;
    this.props.setFilter(value);
    // this.setState({ filter: value });
  };
  getFilteredContacts = () => {
    return this.props.contacts?.filter(
      (contact) =>
        contact.name.toLowerCase().includes(this.props.filter.toLowerCase()) ||
        contact.number.includes(this.props.filter)
    );
  };
  render() {
    return (
      <div className="relative mx-auto max-w-md px-8 py-12 bg-white border-0 shadow-lg sm:rounded-3xl ">
        <PhoneForm addContact={this.addContact} />
        <PhoneFilter filter={this.props.filter} setFilter={this.setFilter} />
        <PhoneList
          contacts={this.getFilteredContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    filter: state.filter,
  };
};
const mapDispatchToProps = {
  addContact,
  deleteContact,
  getAllContacts,
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
