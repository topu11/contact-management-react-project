
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from "uuid";
import Header from './components/Header';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';

function App() {
  const LOCAL_STORAGE_KEY='contactList';
  const previous_contacts=localStorage.getItem(LOCAL_STORAGE_KEY);
  let parsedJsonContacts;
  if(previous_contacts)
  {

    parsedJsonContacts=JSON.parse(previous_contacts)
  }else
  {
     parsedJsonContacts=[];
  }

 const [contacts,setcontacts]=useState(parsedJsonContacts);

 const addContactHandler = (contact) => {
  
  setcontacts([...contacts, { id: uuid(), ...contact }]);
  
};
    useEffect(()=>{
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    },[contacts]);
    
    const deleteContactHandler=(id)=>{
      const filteredContacts=contacts.filter((contact)=>{
        return contact.id !==id;
      })
      setcontacts(filteredContacts);
    }

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} deleteContactHandler={deleteContactHandler}/>
    </div>
  );
}

export default App;
