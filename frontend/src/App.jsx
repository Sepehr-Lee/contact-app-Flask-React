import { useState, useEffect } from 'react'
import ContactList from './ContactList.jsx'
import ContactForm from './ContactForm.jsx'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [editingContact, setEditingContact] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/contacts`)
      const data = await response.json()
      setContacts(data.contacts)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const handleCreate = async (contact) => {
    try {
      const response = await fetch(`${API_URL}/create_contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      })
      if (response.ok) {
        fetchContacts()
        return true
      }
    } catch (error) {
      console.error('Error creating contact:', error)
    }
    return false
  }

  const handleUpdate = async (id, contact) => {
    try {
      const response = await fetch(`${API_URL}/update_contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      })
      if (response.ok) {
        fetchContacts()
        setEditingContact(null)
        return true
      }
    } catch (error) {
      console.error('Error updating contact:', error)
    }
    return false
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete_contact/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchContacts()
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  return (
    <div className="app">
      <h1>Contact Manager</h1>
      <ContactForm 
        onSubmit={editingContact ? 
          (contact) => handleUpdate(editingContact.id, contact) : 
          handleCreate
        }
        initialData={editingContact}
        onCancel={() => setEditingContact(null)}
      />
      <ContactList 
        contacts={contacts}
        onEdit={setEditingContact}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App