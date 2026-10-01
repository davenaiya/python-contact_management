import { Mail, MapPin, Pencil, Phone, Trash2, Users } from "lucide-react";

export default function ContactList({ contacts, onEdit, onDelete, onAdd, isSearching }) {
  if (contacts.length === 0) return <div className="empty-state"><Users size={42} /><h3>{isSearching ? "No contacts found." : "No contacts yet"}</h3><p>{isSearching ? "Try a different name, email, or phone number." : "Add your first contact to get started."}</p>{!isSearching && <button onClick={onAdd}>Add Contact</button>}</div>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Contact</th><th>Email</th><th>Phone</th><th>Address</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td><div className="contact-name"><span className="avatar">{contact.name.charAt(0).toUpperCase()}</span><strong>{contact.name}</strong></div></td>
              <td><span className="table-detail"><Mail size={16} />{contact.email}</span></td><td><span className="table-detail"><Phone size={16} />{contact.phone}</span></td><td><span className="table-detail"><MapPin size={16} />{contact.address}</span></td>
              <td>
                <button className="icon-button edit-button" onClick={() => onEdit(contact)} aria-label="Edit Contact" title="Edit Contact"><Pencil size={17} /></button><button className="icon-button delete-button" onClick={() => onDelete(contact)} aria-label="Delete Contact" title="Delete Contact"><Trash2 size={17} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
