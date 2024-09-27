import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import GuestForm from './GuestForm';
import Loader from 'react-loader';

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

  async function createUser() {
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

  async function allAttendingGuests() {
    const response = await fetch(baseUrl);
    const data = await response.json();

    const allAttending = data.filter((g) => g.attending === true);
    setGuest(allAttending);
    if (!allAttending) {
      const p = document.createElement('div');
      p.textContent = 'No Attending Guests Found!';
      document.body.appendChild(p);
    } else {
      setGuest(allAttending);
    }
  }

  async function nonAttendingGuests() {
    const response = await fetch(baseUrl);
    const data = await response.json();
    const nonAttending = data.filter((g) => g.attending === false);
    setGuest(nonAttending);
  }

  async function allGuests() {
    const response = await fetch(baseUrl);

    const updatedData = await response.json();

    console.log(updatedData);
    setGuest(updatedData);
  }

  return (
    <div className={styles.guest_container}>
      <h1>Guest List</h1>
      <GuestForm
        createUser={createUser}
        isLoading={isLoading}
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        allAttendingGuests={allAttendingGuests}
        nonAttendingGuests={nonAttendingGuests}
        allGuests={allGuests}
      />

      {isLoading ? (
        <div>
          <p>Loading...</p>

          <Loader loaded={false} className={styles.loader} />
        </div>
      ) : (
        guest.map((user) => {
          return (
            <div
              key={`user-${user.id}`}
              data-test-id="guest"
              className={styles.guest_list}
            >
              <ul>
                <li>
                  <input
                    disabled={isLoading}
                    type="checkbox"
                    checked={user.attending}
                    onChange={() => handleChecked(user.id)}
                    aria-label={`${user.firstName} ${user.lastName} attending ${user.attending}`}
                  />

                  <h2>
                    {user.firstName} {user.lastName}
                  </h2>

                  <button
                    aria-label={`Remove ${user.firstName} ${user.lastName}`}
                    onClick={() => handleDelete(user.id)}
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </li>
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}
