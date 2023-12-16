import { Item, ButtonList, } from './ContactsList.styled';

export const ContactsList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <Item key={contact.id}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <ButtonList onClick={() => onDelete(contact.id)}>Delete</ButtonList>
          </Item>
        );
      })}
    </ul>
  );
};