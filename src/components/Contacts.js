import React from "react";
import { Link, Redirect } from "react-router-dom";

class Contacts extends React.Component {
  state = {
    redirectTo: "",
    contactToBeViewed: {},
    search: ""
  };

  contactClicked = (contact) => {
    this.setState({
      redirectTo: "/view",
      contactToBeViewed: contact
    });
  };

  render() {
    if (this.state.redirectTo) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirectTo,
            state: {
              contact: this.state.contactToBeViewed
            }
          }}
          push
        />
      );
    }

    console.log(this.props);

    let contactsToShow = [];

    if (this.state.search) {
      contactsToShow = this.props.contacts.filter((contact) => {
        if (
          contact.name.includes(this.state.search) ||
          contact.email.includes(this.state.search) ||
          contact.phone.includes(this.state.search)
        ) {
          return true;
        }
        return false;
      });
    } else {
      contactsToShow = this.props.contacts;
    }

    return (
      <div>
        <h2>Contatos</h2>
        <Link to="/add">
          <button>Adicionar novo contato</button>
        </Link>
        <br />
        <br />
        <input
          placeholder="Buscar contacto ..."
          value={this.state.search}
          onChange={(e) => this.setState({ search: e.target.value })}
        />
        <ul>
          {contactsToShow.map((contact) => (
            <li key={contact.id} onClick={() => this.contactClicked(contact)}>
              {contact.name} | {contact.email} | {contact.phone}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Contacts;
