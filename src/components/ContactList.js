import React from "react";
import ContactCard from "./ContactCard"

const ContactList=(props)=>{
     const delteContactHandler=(id)=>{
       props.deleteContactHandler(id)
     }

    const renderContactList = props.contacts.map((contact) => {
        return (
          <ContactCard
          contact={contact}
          delteContactHandler={delteContactHandler}
          />
        );
      });
      return <div className="ui celled list">{renderContactList}</div>;
}
export default ContactList;