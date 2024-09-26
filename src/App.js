import { useEffect, useState } from 'react';

export default function App() {
  const [lastName, setLastName] = useState('Ira');

  const [firstName, setFirstName] = useState('bruce');

  const [guest, setGuest] = useState([]);

  const baseUrl = 'https://9rbjs-4000.csb.app/guests/';

  useEffect(() => {
    const getAllGuest = async () => {
      try {
        const response = await fetch(`${baseUrl}`);
        if (!response.ok) throw Error('Error Message');
        const data = await response.json();
        setGuest(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getAllGuest();
  }, []);

  // Add new Guest

  const createUser = async (event) => {
    try {
      event.preventDefault();
      const newGuest = {
        firstName,
        lastName,
        attending: false,
      };
      setGuest([...guest, newGuest]);

      const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuest),
      });

      setFirstName('');
      setLastName('');

      const result = await response.json(response);
    } catch (error) {
      console.error('Error creating :', error);
    }
  };

  async function handleDelete(id) {
    try {
      const response = await fetch(`${baseUrl}${id}`, { method: 'DELETE' });

      const deleteGuest = guest.filter((user) => user.id !== id);
      setGuest(deleteGuest);
      const result = await response.json(response);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  async function handleChecked(id) {
    try {
      const response = await fetch(`${baseUrl}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attending: !guest.find((user) => user.id === id).attending,
        }),
      });
      const updatedUser = await response.json();
      // const updatedGuest = await response.json();
      const updatedGuest = guest.map((user) =>
        user.id === id ? { ...user, attending: !user.attending } : user,
      );

      setGuest(updatedGuest);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <div>
      <h1>Guest List</h1>
      {guest.map((user) => {
        return (
          <div key={user.id} data-test-id="guest">
            <div>
              <input
                type="checkbox"
                aria-label={`Remove ${user.firstName} ${user.lastName}`}
                checked={user.attending}
                onChange={() => handleChecked(user.id)}
              />
              {user.firstName} {user.lastName}{' '}
              <button
                aria-label={`${user.firstName} ${user.lastName} attending ${user.attending}`}
                onClick={() => handleDelete(user.id)}>
                remove
              </button>
            </div>
          </div>
        );
      })}

      <form onSubmit={createUser}>
        <label>
          First name
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last name
          <input
            type="text"
            name="name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <button type="submit">Create user</button>
      </form>
    </div>
  );
}
