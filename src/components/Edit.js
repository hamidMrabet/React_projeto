import React from "react";
import { Link, Redirect } from "react-router-dom";
import FormInput from "./FormInput";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.location.state.contact.name,
      email: props.location.state.contact.email,
      phone: props.location.state.contact.phone,
      redirectTo: ""
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  editContact = () => {
    const { name, email, phone } = this.state;
    const newContact = {
      name,
      email,
      phone,
      id: this.props.location.state.contact.id
    };
    this.props.editContact(newContact);
    this.setState({ redirectTo: "/contacts" });
  };

  render() {
    console.log(this.props.location);
    const contact = this.props.location.state.contact;
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} push />;
    }

    return (
      <div>
        <h2>Edit Contactos</h2>
        <FormInput
          value={this.state.name}
          label="Nome"
          onChange={this.onChange}
          name="name"
        />
        <FormInput
          value={this.state.email}
          label="Email"
          onChange={this.onChange}
          name="email"
        />
        <FormInput
          value={this.state.phone}
          label="Telefone"
          name="phone"
          onChange={this.onChange}
        />
        <br />
        <button onClick={this.editContact}>Edit Contacto</button>
        <br />
        <br />

        <button onClick={this.props.history.goBack}>Cancelar</button>
      </div>
    );
  }
}

export default Edit;
