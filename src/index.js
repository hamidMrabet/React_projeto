import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";
import View from "./components/View";
import Edit from "./components/Edit";
import { Container } from "./components/styles";

import "./components/styles.css";

class App extends React.Component {
  state = {
    contacts: [],
    idToAssign: 1
  };

  componentDidMount() {
    const storeItem = localStorage.getItem("contactList");

    if (storeItem) {
      const contacts = JSON.parse(storeItem);
      this.setState({ contacts });
    }
  }

  addContact = (newContact) => {
    let newContacts = this.state.contacts;
    newContact.id = this.state.idToAssign;
    newContacts.push(newContact);
    console.log(newContacts);
    this.setState({
      contacts: newContacts,
      idToAssign: this.state.idToAssign + 1
    });
    this.updateContacts(newContacts);
  };

  editContact = (newContact) => {
    const id = newContact.id;
    const newContacts = this.state.contacts.map((item) => {
      if (item.id === id) {
        return newContact;
      }
      return item;
    });
    this.setState({
      contacts: newContacts
    });
    this.updateContacts(newContacts);
  };

  updateContacts = (newContacts) => {
    const storeItem = JSON.stringify(newContacts);
    localStorage.setItem("contactList", storeItem);
  };

  render() {
    return (
      <Container>
        <Route
          path="/"
          render={(routeProps) => (
            <div>
              <h2>Cadastro de Contatos</h2>
              <Link to="/contacts">Contatos</Link>
            </div>
          )}
          exact
        />
        <Route
          path="/contacts"
          render={(routeProps) => (
            <Contacts contacts={this.state.contacts} {...routeProps} />
          )}
        />
        <Route
          path="/add"
          render={(routeProps) => (
            <AddContact addContact={this.addContact} {...routeProps} />
          )}
        />
        <Route
          path="/edit"
          render={(routeProps) => (
            <Edit editContact={this.editContact} {...routeProps} />
          )}
        />
        <Route path="/view" render={(routeProps) => <View {...routeProps} />} />
      </Container>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
