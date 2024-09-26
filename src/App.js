import { useEffect, useState } from 'react';

export default function App() {
  const [lastName, setLastName] = useState('Ira');

  const [firstName, setFirstName] = useState('bruce');

  const [guest, setGuest] = useState([]);

  const baseUrl = 'https://9rbjs-4000.csb.app/guests/';

  useEffect(() => {
    const getAllGuest = async () => {
      const response = await fetch(`${baseUrl}`);
      const data = await response.json();
      console.log(data);
      setGuest(data);
    };
    getAllGuest();
  }, []);

  const createUser = async (event) => {
    event.preventDefault();

    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, attending: false }),
    });

    if (response.ok) {
      console.log('Form submitted successfully!');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // const newUser = await response.json();
    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      attending: false,
    };

    setGuest([...guest, newUser]);
    console.log(guest);
    setFirstName('');
    setLastName('');
  };

  // const userHandleSubmit = (event) => {
  //   event.preventDefault();
  //   const newUser = {
  //     id: Date.now(),
  //     firstName,
  //     lastName,
  //     attending: false,
  //   };
  //   setGuest([...guest, newUser]);
  //   setFirstName('');
  //   setLastName('');
  // };

  async function handleDelete(id) {
    const response = await fetch(`${baseUrl}${id}`, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const deleteGuest = guest.filter((user) => user.id !== id);
    setGuest(deleteGuest);
  }

  async function handleChecked(id) {
    const response = await fetch(`${baseUrl}${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attending: !guest.find((user) => user.id === id).attending,
      }),
    });
    // const updatedGuest = await response.json();
    const updatedGuest = guest.map((user) =>
      user.id === id ? { ...user, attending: !user.attending } : user,
    );

    setGuest(updatedGuest);
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
