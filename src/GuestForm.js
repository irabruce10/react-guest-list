import styles from './App.module.scss';

export default function GuestForm({
  createUser,
  isLoading,
  firstName,
  lastName,
  setFirstName,
  setLastName,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createUser();
      }}
      disabled={isLoading}
      className={styles.guest_form}
    >
      <label>
        <span>First name</span>
        <input
          disabled={isLoading}
          placeholder="Add the first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <br />
      <label>
        <span>Last name</span>
        <input
          disabled={isLoading}
          placeholder="Add the last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>

      <br />
      <button>Create user</button>
    </form>
  );
}
