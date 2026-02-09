import { useState, useEffect } from 'react'
import './ContactForm.css'

function ContactForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await onSubmit(formData)
    if (success) {
      setFormData({
        firstName: '',
        lastName: '',
        email: ''
      })
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: ''
    })
    onCancel()
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Contact' : 'Add New Contact'}</h2>
      <div className="form-group">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit">
          {initialData ? 'Update Contact' : 'Add Contact'}
        </button>
        {initialData && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ContactForm


// console logging (bebin error chi mide --> fix backend ke ba front harf bzne)
const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log('Form submitted with data:', formData);
  console.log('API URL:', import.meta.env.VITE_API_URL);
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/create_contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    const result = await response.json();
    console.log('Response data:', result);
    
    if (response.ok) {
      alert('Contact created successfully!');
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    alert('Failed to create contact. Check console for details.');
  }
};