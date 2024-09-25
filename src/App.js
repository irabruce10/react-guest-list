import { useState } from 'react';

export default function App() {
  const [lastName, setLastName] = useState('');

  const [firstName, setFirstName] = useState('');

  return (
    <div>
      <h1></h1>
      <form>
        <label>
          First name
          <input type="text" name="name" placeholder="First Name" />
        </label>
        <br />
        <label>
          Last name
          <input type="text" name="name" placeholder="Last Name" />
        </label>
      </form>
    </div>
  );
}
