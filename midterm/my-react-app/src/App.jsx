import React, { useState, useEffect } from 'react';
import './App.css';

const initialEvents = [
  { id: 1, image: 'https://placehold.co/600x400/111111/00ff00?text=React+Conf', title: 'React Conference 2025', date: '20-22 Ноября, 2025', location: 'Алматы', price: '15000 KZT' },
  { id: 2, image: 'https://placehold.co/600x400/111111/00ff00?text=AI+Summit', title: 'AI & Machine Learning Summit', date: '5-6 Декабря, 2025', location: 'Астана', price: '25000 KZT' },
  { id: 3, image: 'https://placehold.co/600x400/111111/00ff00?text=CyberSec', title: 'CyberSecurity Forum', date: '15 Января, 2026', location: 'Караганда', price: '10000 KZT' },
  { id: 4, image: 'https://placehold.co/600x400/111111/00ff00?text=DevOps+Day', title: 'DevOps Day', date: '2 Февраля, 2026', location: 'Алматы', price: '12000 KZT' },
  { id: 5, image: 'https://placehold.co/600x400/111111/00ff00?text=GameDev', title: 'Game Development Meetup', date: '18 Февраля, 2026', location: 'Астана', price: 'Бесплатно' },
  { id: 6, image: 'https://placehold.co/600x400/111111/00ff00?text=Web3+KZ', title: 'Web3 & Blockchain KZ', date: '25 Марта, 2026', location: 'Алматы', price: '20000 KZT' },
];

const Header = ({ setPage }) => (
  <header className="header">
    <div className="logo-container" onClick={() => setPage('home')}>
      <i className="fas fa-code logo"></i>
      <span className="site-title">IT-Events Portal</span>
    </div>
    <nav className="nav-icons">
      <i className="fas fa-home nav-icon" title="Главная" onClick={() => setPage('home')}></i>
      <i className="fas fa-calendar-alt nav-icon" title="Мероприятия" onClick={() => setPage('events')}></i>
      <i className="fas fa-user nav-icon" title="Личный кабинет" onClick={() => setPage('profile')}></i>
    </nav>
  </header>
);

const HomePage = ({ setPage }) => (
  <div className="home-page container">
    <h1 className="welcome-message">Добро пожаловать на IT-Events Portal</h1>
    <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Ваш гид в мире технологических событий</p>
    <button className="cta-button" onClick={() => setPage('events')}>
      Найти мероприятие
    </button>
  </div>
);

const EventCard = ({ event, onRegister }) => (
  <div className="event-card">
    <img src={event.image} alt={event.title} className="event-image" />
    <div className="event-info">
      <h3 className="event-title">{event.title}</h3>
      <div className="event-details">
        <p><i className="fas fa-calendar-alt"></i> {event.date}</p>
        <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>
        <p><i className="fas fa-tag"></i> {event.price}</p>
      </div>
      <button className="register-button" onClick={() => onRegister(event.title)}>Зарегистрироваться</button>
    </div>
  </div>
);

const RegistrationModal = ({ eventName, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }
    alert(`Вы успешно зарегистрировались на "${eventName}"!`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Регистрация на {eventName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Номер телефона:</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="modal-submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [events, setEvents] = useState(initialEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState('');

  useEffect(() => {
    let filteredEvents = initialEvents;
    if (searchQuery) {
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCity) {
      filteredEvents = filteredEvents.filter(event => event.location === selectedCity);
    }
    setEvents(filteredEvents);
  }, [searchQuery, selectedCity]);

  const handleRegisterClick = (eventName) => {
    setCurrentEvent(eventName);
    setIsModalOpen(true);
  };

  const uniqueCities = [...new Set(initialEvents.map(event => event.location))];

  return (
    <div className="events-page container">
      <div className="filters">
        <input
          type="text"
          placeholder="Поиск по названию..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="city-filter" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="">Все города</option>
          {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>
      <div className="events-grid">
        {events.length > 0 ? (
          events.map(event => (
            <EventCard key={event.id} event={event} onRegister={handleRegisterClick} />
          ))
        ) : (
          <p>Мероприятия не найдены.</p>
        )}
      </div>
      {isModalOpen && <RegistrationModal eventName={currentEvent} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

const UserProfile = () => (
  <div className="centered-page container">
    <h1>Личный кабинет</h1>
    <p>Войдите или создайте аккаунт, чтобы управлять вашими регистрациями.</p>
    <div className="auth-buttons">
      <button className="auth-button login-btn">Войти</button>
      <button className="auth-button register-btn">Зарегистрироваться</button>
    </div>
  </div>
);

const NotFoundPage = () => (
  <div className="centered-page container">
    <h1>404</h1>
    <p>Страница не найдена. Похоже, вы зашли куда-то не туда.</p>
  </div>
);


function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} />;
      case 'events':
        return <EventsPage />;
      case 'profile':
        return <UserProfile />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <>
      <Header setPage={setPage} />
      <main>
        {renderPage()}
      </main>
    </>
  );
}

export default App;