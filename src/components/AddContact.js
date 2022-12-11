import React from "react";
import { link, Redirect } from "react-router-dom";
import FormInput from "./FormInput";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
    redirectTo: ""
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addContact = () => {
    const { name, email, phone } = this.state;
    const newContact = {
      name,
      email,
      phone
    };
    this.props.addContact(newContact);
    this.setState({ redirectTo: "/contacts" });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} push />;
    }

    return (
      <div>
        <h2>Adicionar Contactd</h2>
        <FormInput label="Nome" onChange={this.onChange} name="name" />
        <FormInput label="Email" onChange={this.onChange} name="email" />
        <FormInput label="Telefone" name="phone" onChange={this.onChange} />
        <button onClick={this.addContact}>Adicionar</button>

        <button onClick={this.props.history.goBack}>Cancelar</button>
      </div>
    );
  }
}

export default AddContact;
