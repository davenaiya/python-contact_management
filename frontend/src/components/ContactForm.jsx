import { useEffect, useState } from "react";
import { Mail, MapPin, Phone, User, X } from "lucide-react";

const emptyContact = { name: "", email: "", phone: "", address: "" };

export default function ContactForm({ selectedContact, onSubmit, onCancel, onClose }) {
  const [form, setForm] = useState(emptyContact);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setForm(selectedContact ? { ...selectedContact, address: selectedContact.address || "" } : emptyContact);
  }, [selectedContact]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setValidationError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim()) {
      setValidationError("Please complete all fields.");
      return;
    }
    onSubmit(form);
  }

  return (
    <section className="form-card">
      <div className="form-heading"><div><h2>{selectedContact ? "Edit Contact" : "Add New Contact"}</h2><p>Enter the contact details below.</p></div><button className="icon-button close-button" type="button" aria-label="Close form" title="Close form" onClick={onClose}><X size={20} /></button></div>
      <form onSubmit={handleSubmit}>
        <label><span>Full Name</span><div className="input-with-icon"><User size={18} /><input name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" required /></div></label>
        <label><span>Email Address</span><div className="input-with-icon"><Mail size={18} /><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email address" required /></div></label>
        <label><span>Phone Number</span><div className="input-with-icon"><Phone size={18} /><input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" required /></div></label>
        <label><span>Address</span><div className="input-with-icon"><MapPin size={18} /><input name="address" value={form.address} onChange={handleChange} placeholder="Enter address" required /></div></label>
        {validationError && <p className="field-error">{validationError}</p>}
        <div className="form-actions"><button type="button" className="button-secondary" onClick={onCancel}>Cancel</button><button type="submit">{selectedContact ? "Update Contact" : "Add Contact"}</button></div>
      </form>
    </section>
  );
}
