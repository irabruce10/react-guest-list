import { useState } from 'react';

export default function App() {
  const [lastName, setLastName] = useState('Ira');

  const [firstName, setFirstName] = useState('bruce');

  const [users, setUsers] = useState([]);

  const userHandleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      attending: false,
    };
    setUsers([...users, newUser]);
    setFirstName('');
    setLastName('');
  };

  function handleDelete(id) {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  }

  function handleChecked(id) {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, attending: !user.attending } : user,
    );

    setUsers(updatedUsers);
  }

  return (
    <div>
      <h1>Guest List</h1>
      {users.map((user) => {
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

      <form onSubmit={userHandleSubmit}>
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
