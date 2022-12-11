import React from "react";
import { Link } from "react-router-dom";

class View extends React.Component {
  render() {
    const contact = this.props.location.state.contact;
    return (
      <div>
        <h2>Atualizar Contacto</h2>
        <span>{contact.name}</span>
        <span>{contact.email}</span>
        <span>{contact.phone}</span>

        <Link
          to={{
            pathname: "/edit",
            state: {
              contact
            }
          }}
        >
          <button>Edit</button>
        </Link>
        <br />
        <br />
        <button onClick={this.props.history.goBack}>Voltar</button>
      </div>
    );
  }
}

export default View;
