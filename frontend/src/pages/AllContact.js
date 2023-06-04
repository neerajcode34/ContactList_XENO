import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const AllContact = () => {
  const { user } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch contacts data from the API
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/mycontacts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setContacts(result.contacts);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setContacts(result.myContacts);
        toast.success("Contact deleted successfully.");
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editContact = (id) => {
    navigate(`/edit/${id}`);
  };

  const updateContact = async (id, updatedData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();
      if (!result.error) {
        // Update the contact in the local state
        const updatedContacts = contacts.map((contact) => {
          if (contact._id === id) {
            return { ...contact, ...updatedData };
          }
          return contact;
        });
        setContacts(updatedContacts);
        toast.success("Contact updated successfully.");
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "30px" }}>Your Contacts</h1>
      <Link to="/create" className="btn btn-primary my-2">
        Add Contact
      </Link>
      <hr className="my-4" />

      {contacts.length === 0 ? (
        <h3>No contacts created yet</h3>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr className="tr-violet">
              <th className="black-text" scope="col">
                Name
              </th>
              <th className="black-text" scope="col">
                Phone
              </th>
              <th className="black-text" scope="col">
                Email
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <th scope="row">{contact.name}</th>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => editContact(contact._id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteContact(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllContact;
