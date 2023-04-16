import { useState } from 'react';

function Creat() {
  const [dispo, setDispo] = useState({
    date: '',
    heure_debut: '',
    heure_fin: '',
    description: '',
    email: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setDispo(prevDispo => ({
      ...prevDispo,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dispo),
      });
      const data = await response.json();
      console.log(data);
      setDispo({
        date: '',
        heure_debut: '',
        heure_fin: '',
        description: '',
        email: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Créer une disponibilité</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={dispo.date}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="heure_debut">Heure de début</label>
        <input
          type="time"
          id="heure_debut"
          name="heure_debut"
          value={dispo.heure_debut}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="heure_fin">Heure de fin</label>
        <input
          type="time"
          id="heure_fin"
          name="heure_fin"
          value={dispo.heure_fin}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={dispo.description}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={dispo.email}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default Creat;
