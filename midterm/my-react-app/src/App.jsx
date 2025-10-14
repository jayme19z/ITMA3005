import React, { useMemo, useReducer, useState, useEffect } from "react";
import "./App.css";

const MOCK_EVENTS = [
  { id: "e1", title: "Tech Conference 2025", date: "2025-11-10", location: "Astana", category: "conference", description: "A deep dive into the future of AI and cloud computing." },
  { id: "e2", title: "UI/UX Design Workshop", date: "2025-12-01", location: "Almaty", category: "workshop", description: "Learn user experience design with hands-on practice." },
  { id: "e3", title: "Music Festival", date: "2025-12-15", location: "Paris", category: "concert", description: "An unforgettable night of live performances." }
];

const formatDate = (iso) => new Date(iso).toLocaleDateString();

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return action.initial;
    default:
      return state;
  }
}

export default function App() {
  const [events] = useState(MOCK_EVENTS);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState(
    () => JSON.parse(localStorage.getItem("registrations_v1") || "[]")
  );

  const [form, dispatchForm] = useReducer(formReducer, {
    name: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    localStorage.setItem("registrations_v1", JSON.stringify(registrations));
  }, [registrations]);

  const filtered = useMemo(() => {
    return events.filter(
      (e) =>
        (category === "all" || e.category === category) &&
        e.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [events, query, category]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.includes("@")) errs.email = "Invalid email";
    if (!form.phone.match(/^[0-9\\-\\+]{9,15}$/)) errs.phone = "Invalid phone";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const reg = { ...form, eventTitle: selectedEvent.title, createdAt: new Date().toISOString() };
      setRegistrations((prev) => [reg, ...prev]);
      setSuccess(`Successfully registered for ${selectedEvent.title}!`);
      dispatchForm({ type: "RESET", initial: { name: "", email: "", phone: "" } });
      setTimeout(() => setSelectedEvent(null), 1200);
    }
  };

  return (
    <>
      <header className="header">
        <h1>Event Registration</h1>
      </header>

      <main className="content">
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="concert">Concert</option>
          </select>
        </div>

        <div className="event-list">
          {filtered.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p className="event-details">
                📅 {formatDate(event.date)} | 📍 {event.location}
              </p>
              <p>{event.description}</p>
              <div className="event-actions">
                <button onClick={() => setSelectedEvent(event)}>Register Now</button>
              </div>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div className="modal">
            <div className="modal-content">
              <h2>Register for {selectedEvent.title}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    dispatchForm({ type: "SET_FIELD", field: "name", value: e.target.value })
                  }
                />
                {errors.name && <p className="error-message">{errors.name}</p>}

                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) =>
                    dispatchForm({ type: "SET_FIELD", field: "email", value: e.target.value })
                  }
                />
                {errors.email && <p className="error-message">{errors.email}</p>}

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) =>
                    dispatchForm({ type: "SET_FIELD", field: "phone", value: e.target.value })
                  }
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}

                <div className="buttons">
                  <button type="submit">Submit</button>
                  <button type="button" className="close-btn" onClick={() => setSelectedEvent(null)}>
                    Cancel
                  </button>
                </div>

                {success && <p className="success">{success}</p>}
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
