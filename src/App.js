import { useEffect, useState } from 'react';

export default function App() {
  const [lastName, setLastName] = useState('');

  const [firstName, setFirstName] = useState('');

  const [guest, setGuest] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = 'https://9rbjs-4000.csb.app/guests/';

  const getAllGuest = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(baseUrl);
      if (!response.ok) throw Error('Error Message');
      const data = await response.json();
      setGuest(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const a = getAllGuest();
    console.log(a);
  }, []);

  // Add new Guest

  async function createUser(e) {
    e.preventDefault();
    try {
      const newGuest = {
        firstName,
        lastName,
        attending: false,
      };
      setGuest([...guest, newGuest]);

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuest),
      });

      setFirstName('');
      setLastName('');

      await response.json(response);
    } catch (error) {
      console.error('Error creating :', error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`${baseUrl}${id}`, { method: 'DELETE' });

      const deleteGuest = guest.filter((user) => user.id !== id);
      setGuest(deleteGuest);
      await response.json(response);
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
      await response.json();

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

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        guest.map((user) => {
          return (
            <div key={`user-${user.id}`} data-test-id="guest">
              <div>
                <input
                  type="checkbox"
                  checked={user.attending}
                  onChange={() => handleChecked(user.id)}
                  aria-label={`${user.firstName} ${user.lastName} attending ${user.attending}`}
                />
                {user.firstName} {user.lastName}{' '}
                <button
                  aria-label={`Remove ${user.firstName} ${user.lastName}`}
                  onClick={() => handleDelete(user.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })
      )}

      <form onSubmit={createUser}>
        <label>
          First name
          <input
            disabled={isLoading}
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
            disabled={isLoading}
            name="name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <button>Create user</button>
      </form>
    </div>
  );
}
