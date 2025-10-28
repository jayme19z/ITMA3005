// const [dislikes, setdislikes] = React.useState(0);
// <button onClick={() => setdislikes(dislikes + 1)}>💔 {dislikes} Dislikes</button>

import React, { useEffect, useMemo, useReducer, useState } from "react";
import "./App.css";

const MOCK_EVENTS = [
  { id: "e1", title: "Design Systems Workshop", date: "2025-11-05T10:00:00", location: "Almaty Tech Hub", category: "workshop", description: "Hands-on workshop to build scalable design systems.", price: 15, popularity: 120 },
  { id: "e2", title: "Indie Music Night", date: "2025-10-25T19:30:00", location: "Riverside Club", category: "concert", description: "Local bands and cozy vibes.", price: 8, popularity: 300 },
  { id: "e3", title: "AI & Product Conf", date: "2026-01-15T09:00:00", location: "Online", category: "conference", description: "Two-day conference exploring AI in product design.", price: 49, popularity: 540 },
  { id: "e4", title: "Community Potluck Dinner", date: "2025-10-30T17:00:00", location: "Green Park Pavilion", category: "social", description: "Bring a plate, meet neighbors — vegetarian friendly.", price: 0, popularity: 90 }
];

const formatDate = (iso) => new Date(iso).toLocaleString();

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
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [registrations, setRegistrations] = useState(() =>
    JSON.parse(localStorage.getItem("registrations_v1") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("registrations_v1", JSON.stringify(registrations));
  }, [registrations]);

  const filtered = useMemo(() => {
    let list = events.filter((e) => {
      const q = query.trim().toLowerCase();
      if (q)
        return (
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)
        );
      return true;
    });
    if (category !== "all") list = list.filter((e) => e.category === category);
    if (sortBy === "date") list.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === "popularity") list.sort((a, b) => b.popularity - a.popularity);
    if (sortBy === "price") list.sort((a, b) => a.price - b.price);
    return list;
  }, [events, query, category, sortBy]);

  const initialForm = { name: "", email: "", phone: "", notes: "" };
  const [form, dispatchForm] = useReducer(formReducer, initialForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const openRegister = (ev) => {
    setSelectedEvent(ev);
    setRegisterOpen(true);
    dispatchForm({ type: "RESET", initial: initialForm });
    setErrors({});
    setSuccessMessage("");
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Invalid email";
    if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone)) e.phone = "Invalid phone";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0 && selectedEvent) {
      const reg = {
        id: Date.now(),
        eventTitle: selectedEvent.title,
        ...form,
        createdAt: new Date().toISOString(),
      };
      setRegistrations((prev) => [reg, ...prev]);
      setSuccessMessage("Registered successfully!");
      dispatchForm({ type: "RESET", initial: initialForm });
      setTimeout(() => setRegisterOpen(false), 1000);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Eventify — Discover & Register</h1>
        <p className="subtitle">Search, filter and register easily</p>
      </header>

      <main>
        <div className="filter-bar" role="region" aria-label="Event filters">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search events"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Category filter"
          >
            <option value="all">All</option>
            <option value="workshop">Workshop</option>
            <option value="concert">Concert</option>
            <option value="conference">Conference</option>
            <option value="social">Social</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort by"
          >
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
            <option value="price">Price</option>
          </select>
        </div>

        <div className="event-list">
          {filtered.map((ev) => (
            <article key={ev.id} className="event-card">
              <h3>{ev.title}</h3>
              <p className="event-details">
                {new Date(ev.date).toLocaleString()} • {ev.location}
              </p>
              <p>{ev.description}</p>
              <div className="event-actions">
                <span>{ev.price === 0 ? "Free" : `$${ev.price}`}</span>
                <button onClick={() => openRegister(ev)}>Register Now</button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {isRegisterOpen && selectedEvent && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-content">
            <h3 id="modal-title">Register for {selectedEvent.title}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    dispatchForm({ type: "SET_FIELD", field: "name", value: e.target.value })
                  }
                  required
                />
              </label>
              {errors.name && <div className="error-message">{errors.name}</div>}

              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    dispatchForm({ type: "SET_FIELD", field: "email", value: e.target.value })
                  }
                  required
                />
              </label>
              {errors.email && <div className="error-message">{errors.email}</div>}

              <label>
                Phone
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    dispatchForm({ type: "SET_FIELD", field: "phone", value: e.target.value })
                  }
                  required
                />
              </label>
              {errors.phone && <div className="error-message">{errors.phone}</div>}

              <label>
                Notes
                <textarea
                  rows="3"
                  value={form.notes}
                  onChange={(e) =>
                    dispatchForm({ type: "SET_FIELD", field: "notes", value: e.target.value })
                  }
                />
              </label>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: ".5rem" }}>
                <button type="submit">Submit</button>
                <button type="button" className="close-btn" onClick={() => setRegisterOpen(false)}>
                  Cancel
                </button>
              </div>
              {successMessage && <p className="success">{successMessage}</p>}
            </form>
          </div>
        </div>
      )}

      <footer style={{ textAlign: "center", padding: "2rem 1rem" }}>
        <p>Built as a midterm prototype (React + CSS)</p>
      </footer>
    </div>
  );
}