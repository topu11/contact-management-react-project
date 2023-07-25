import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";

import { v4 as uuid } from "uuid";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import ContactDetails from "./components/ContactDetails";


function App() {
  const LOCAL_STORAGE_KEY = "contactList";
  const previous_contacts = localStorage.getItem(LOCAL_STORAGE_KEY);
  let parsedJsonContacts;
  if (previous_contacts) {
    parsedJsonContacts = JSON.parse(previous_contacts);
  } else {
    parsedJsonContacts = [];
  }

  const [contacts, setcontacts] = useState(parsedJsonContacts);

  const addContactHandler = (contact) => {
    setcontacts([...contacts, { id: uuid(), ...contact }]);
  };
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const deleteContactHandler = (id) => {
    const filteredContacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setcontacts(filteredContacts);
  };

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            Component={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/"
            Component={() => (
              <ContactList
                contacts={contacts}
                deleteContactHandler={deleteContactHandler}
              />
            )}
          />

          <Route
            path="/contactdetails/:id"
            Component={()=>(<ContactDetails />)}
          />
        </Routes>

        {/* <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} deleteContactHandler={deleteContactHandler}/> */}
      </Router>
    </div>
  );
}

export default App;
