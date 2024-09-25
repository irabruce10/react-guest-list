import { useState } from 'react';

export default function App() {
  const [lastName, setLastName] = useState('');

  const [firstName, setFirstName] = useState('');

  const [users, setUsers] = useState([]);

  const userHandleSubmit = (event) => {
    event.preventDefault();
    setUsers([...users, { firstName, lastName }]);
    setFirstName('');
    setLastName('');
    console.log('User');
  };

  return (
    <div>
      {users.map((user) => {
        return (
          <h1 key={user.firstName}>
            {user.firstName} {user.lastName}
          </h1>
        );
      })}
      <h1>Guest List</h1>
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
