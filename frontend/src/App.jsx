import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, ChevronRight, LayoutDashboard, Mail, Menu, Plus, RefreshCw, Search, Trash2, UserPlus, Users, X } from "lucide-react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { createContact, deleteContact, getContacts, updateContact } from "./services/contactService";

export default function App() {
  const [allContacts, setAllContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadContacts() {
    try {
      const response = await getContacts();
      setAllContacts(response.data);
      setError("");
    } catch {
      setError("Unable to load contacts. Please check that the backend is running.");
    }
  }

  useEffect(() => { loadContacts(); }, []);

  function changeView(view) {
    setActiveView(view);
    setSidebarOpen(false);
    if (view !== "add") closeForm();
    if (view === "add") openAddForm(false);
  }

  function closeForm() { setSelectedContact(null); setShowForm(false); }
  function openAddForm(goToAdd = true) {
    setSelectedContact(null);
    setShowForm(true);
    if (goToAdd) setActiveView("add");
    setSidebarOpen(false);
  }
  function openEditForm(contact) {
    setSelectedContact(contact);
    setShowForm(true);
    setActiveView("contacts");
  }

  async function handleSubmit(contact) {
    try {
      const isEditing = Boolean(selectedContact);
      if (isEditing) {
        await updateContact(selectedContact.id, contact);
        setMessage("Contact updated successfully.");
      } else {
        await createContact(contact);
        setMessage("Contact added successfully.");
      }
      closeForm();
      setActiveView("contacts");
      await loadContacts();
    } catch {
      setError(selectedContact ? "Unable to update contact." : "Unable to add contact.");
    }
  }

  async function handleDelete() {
    if (!contactToDelete) return;
    try {
      await deleteContact(contactToDelete.id);
      setContactToDelete(null);
      setMessage("Contact deleted successfully.");
      await loadContacts();
    } catch {
      setError("Unable to delete contact. Please try again.");
    }
  }

  function resetSearchAndRefresh() {
    setSearch("");
    loadContacts();
  }

  const searchText = search.trim().toLowerCase();
  const displayedContacts = allContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchText)
    || contact.email.toLowerCase().includes(searchText)
    || contact.phone.toLowerCase().includes(searchText)
  );
  const totalEmails = allContacts.filter((contact) => contact.email).length;
  const latestContact = allContacts[0];

  function renderHeader(title, subtitle, showAddButton = true) {
    return <header><div className="heading"><button className="menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={22} /></button><div><h1>{title}</h1><p>{subtitle}</p></div></div>{showAddButton && <button className="add-button" onClick={openAddForm}><Plus size={18} />Add Contact</button>}</header>;
  }

  function renderDashboard() {
    return <>
      {renderHeader("Contact Management", "Manage and organize your contacts easily.")}
      <section className="summary-grid">
        <div className="summary-card"><span className="summary-icon blue"><Users size={22} /></span><div><p>Total Contacts</p><strong>{allContacts.length}</strong></div></div>
        <div className="summary-card"><span className="summary-icon purple"><UserPlus size={22} /></span><div><p>Recently Added</p><strong>{latestContact ? latestContact.name : "None yet"}</strong></div></div>
        <div className="summary-card"><span className="summary-icon green"><Mail size={22} /></span><div><p>Total Emails</p><strong>{totalEmails}</strong></div></div>
      </section>
      <section className="contacts-card recent-card"><div className="section-top"><div><h2>Recent Contacts</h2><p>Latest contacts from your contact list.</p></div><button className="view-all-button" onClick={() => changeView("contacts")}>View All Contacts <ChevronRight size={17} /></button></div>
        {allContacts.length === 0 ? <ContactList contacts={[]} onAdd={openAddForm} isSearching={false} /> : <div className="recent-list">{allContacts.map((contact) => <div className="recent-contact" key={contact.id}><span className="avatar">{contact.name.charAt(0).toUpperCase()}</span><div><strong>{contact.name}</strong><span>{contact.email}</span></div><span className="recent-phone">{contact.phone}</span></div>)}</div>}
      </section>
    </>;
  }

  function renderContacts() {
    return <>
      {renderHeader("All Contacts", "Manage all your contacts.")}
      {showForm && <ContactForm selectedContact={selectedContact} onSubmit={handleSubmit} onCancel={closeForm} onClose={closeForm} />}
      <section className="contacts-card"><div className="section-top"><div><h2>Contacts</h2><p>Total {displayedContacts.length} contacts</p></div><div className="search-actions"><div className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, email or phone..." /></div><button className="refresh-button" onClick={resetSearchAndRefresh} title="Clear search and refresh contacts"><RefreshCw size={17} />Refresh</button></div></div><ContactList contacts={displayedContacts} onEdit={openEditForm} onDelete={setContactToDelete} onAdd={openAddForm} isSearching={Boolean(searchText)} /></section>
    </>;
  }

  function renderAddContact() {
    return <>{renderHeader("Add New Contact", "Create a new contact.", false)}<ContactForm selectedContact={null} onSubmit={handleSubmit} onCancel={() => changeView("contacts")} onClose={() => changeView("contacts")} /></>;
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand"><Users size={24} /><span>Contact Manager</span><button className="mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X size={20} /></button></div>
        <nav><button className={`nav-item ${activeView === "dashboard" ? "active" : ""}`} onClick={() => changeView("dashboard")}><LayoutDashboard size={19} />Dashboard</button><button className={`nav-item ${activeView === "contacts" ? "active" : ""}`} onClick={() => changeView("contacts")}><Users size={19} />Contacts</button><button className={`nav-item ${activeView === "add" ? "active" : ""}`} onClick={() => changeView("add")}><UserPlus size={19} />Add Contact</button></nav>
      </aside>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <main className="dashboard">
        {(message || error) && <div className={`toast ${error ? "toast-error" : ""}`}><span>{error ? <AlertCircle size={18} /> : <CheckCircle size={18} />}</span>{error || message}<button onClick={() => { setMessage(""); setError(""); }} aria-label="Dismiss message"><X size={16} /></button></div>}
        {activeView === "dashboard" && renderDashboard()}
        {activeView === "contacts" && renderContacts()}
        {activeView === "add" && renderAddContact()}
      </main>
      {contactToDelete && <div className="modal-backdrop"><section className="delete-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"><span className="delete-modal-icon"><Trash2 size={23} /></span><h2 id="delete-title">Delete Contact?</h2><p>Are you sure you want to delete this contact? This action cannot be undone.</p><div><button className="button-secondary" onClick={() => setContactToDelete(null)}>Cancel</button><button className="delete-confirm" onClick={handleDelete}><Trash2 size={16} />Delete</button></div></section></div>}
    </div>
  );
}
