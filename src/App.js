
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from "uuid";
import Header from './components/Header';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';

function App() {
  const LOCAL_STORAGE_KEY='contactList';
 const [contacts,setcontacts]=useState( JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []);

 const addContactHandler = (contact) => {
  
  setcontacts([...contacts, { id: uuid(), ...contact }]);
  
};
    useEffect(()=>{
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    },[contacts]);

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
