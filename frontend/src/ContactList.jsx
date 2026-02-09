// az javascript motenaferammm AAAAAA
import './ContactList.css'

function ContactList({ contacts, onEdit, onDelete }) {
  if (contacts.length === 0) {
    return <div className="no-contacts">No contacts found. Add your first contact!</div>
  }

  return (
    <div className="contact-list">
      <h2>Contacts ({contacts.length})</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td className="actions">
                <button 
                  className="edit-btn"
                  onClick={() => onEdit(contact)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList