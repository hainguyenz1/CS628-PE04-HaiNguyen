// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom';
import './App.css';
import citiesData from './citiesData';

function Cities() {
  const [cities, setCities] = useState(citiesData);

  return (
    <Router>
      <div className="app-container">
        <h1>Cities Application</h1>
        <nav>
          <Link to="/cities">Cities List</Link> | <Link to="/add">Add City</Link>
        </nav>

        <Routes>
          <Route path="/cities" element={<CityList cities={cities} />} >
            <Route path=":id" element={<CityDetails cities={cities} />} />
            <Route path=":id/things-to-do" element={<ThingsToDo cities={cities} />} />
          </Route>
          <Route path="/add" element={<AddCity setCities={setCities} cities={cities} />} />
        </Routes>
      </div>
    </Router>
  );
}

function CityList({ cities }) {
  return (
    <div>
      <h2>Cities List</h2>
      <ul>
        {cities.map(city => (
          <li key={city.id}>
            <Link to={`/cities/${city.id}`}>{city.name}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

function AddCity({ setCities, cities }) {
  const navigate = useNavigate();
  const [newCity, setNewCity] = useState({ name: '', country: '', population: '', thingsToDo: [] });
  const [newThingToDo, setNewThingToDo] = useState('');

  const handleChange = (e) => {
    setNewCity({ ...newCity, [e.target.name]: e.target.value });
  };

  const handleThingToDoChange = (e) => {
    setNewThingToDo(e.target.value);
  };

  const addThingToDo = () => {
    if (newThingToDo.trim() !== '') {
      setNewCity({
        ...newCity,
        thingsToDo: [...newCity.thingsToDo, newThingToDo.trim()],
      });
      setNewThingToDo('');
    }
  };

  const removeThingToDo = (index) => {
    const updatedThingsToDo = newCity.thingsToDo.filter((_, i) => i !== index);
    setNewCity({ ...newCity, thingsToDo: updatedThingsToDo });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const nextId = cities.length + 1;
    const newCityWithId = { ...newCity, id: nextId };
    setCities([...cities, newCityWithId]);
    navigate('/cities');
  };

  return (
    <div>
      <h2>Add City</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={newCity.name} onChange={handleChange} required /><br />
        <input type="text" name="country" placeholder="Country" value={newCity.country} onChange={handleChange} required /><br />
        <input type="number" name="population" placeholder="Population" value={newCity.population} onChange={handleChange} required /><br />

        <h3>Things to do:</h3>
        <ul>
          {newCity.thingsToDo.map((todo, index) => (
            <li key={index}>
              {todo}
              <button type="button" onClick={() => removeThingToDo(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add thing to do"
          value={newThingToDo}
          onChange={handleThingToDoChange}
        />
        <button type="button" onClick={addThingToDo}>Add</button><br />

        <button type="submit">Add City</button>
      </form>
    </div>
  );
}

function CityDetails({ cities }) {
  const { id } = useParams();
  const cityId = parseInt(id, 10);
  const city = cities.find(c => c.id === cityId);

  if (!city) {
    return <div>City not found</div>;
  }

  return (
    <div>
      <h2>{city.name} Details</h2>
      <p>Country: {city.country}</p>
      <p>Population: {city.population}</p>
      <Link to={`/cities/${city.id}/things-to-do`}>Things to do in {city.name}</Link>
    </div>
  );
}

function ThingsToDo({ cities }) {
  const { id } = useParams();
  const cityId = parseInt(id, 10);
  const city = cities.find(c => c.id === cityId);

  if (!city) {
    return <div>City not found</div>;
  }

  return (
    <div>
      <h2>Things to do in {city.name}</h2>
      <ul>
        {city.thingsToDo.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Cities;