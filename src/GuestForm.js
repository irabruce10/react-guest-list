import styles from './App.module.scss';

export default function GuestForm({
  createUser,
  isLoading,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  resetHandle,
  allAttendingGuests,
  nonAttendingGuests,
  allGuests,
}) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
        disabled={isLoading}
        className={styles.guest_form}
      >
        <label>
          First name
          <input
            disabled={isLoading}
            placeholder="Add the first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last name
          <input
            disabled={isLoading}
            placeholder="Add the last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <br />
        <button>Create Guest</button>
      </form>{' '}
      <div className={styles.filters}>
        {' '}
        <button onClick={resetHandle}>Reset</button>
        <button onClick={nonAttendingGuests}>non-att</button>
        <button onClick={allAttendingGuests}>att</button>
        <button onClick={allGuests}>all</button>
      </div>
    </>
  );
}
