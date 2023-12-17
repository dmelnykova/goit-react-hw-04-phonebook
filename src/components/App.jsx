import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { FilterField } from './FilterField/Filter';
import { GlobalStyle } from './GlobalStyle';


const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const LOCALSTORAGE = 'contacts';

const getSavedContacts = () => {
  const savedContacts = window.localStorage.getItem(LOCALSTORAGE);
  return savedContacts !== null ? JSON.parse(savedContacts) : defaultContacts;
};

export const App = () => {
  const [contacts, setContacts] = useState(getSavedContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      {
        ...newContact,
        id: nanoid(),
      },
    ]);
  };

  const getFilteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <h2>Contacts</h2>
      <FilterField filter={filter} onChange={setFilter} />
      {contacts.length > 0 && (
        <ContactsList contacts={getFilteredContacts()} onDelete={deleteContact} />
      )}

      <GlobalStyle />
    </>
  );
};
