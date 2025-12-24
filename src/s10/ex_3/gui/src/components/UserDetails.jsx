function UserDetails({ user }) {
  return (
    <div className="user-details">
      <h2>Detalii utilizator</h2>
      <p>
        <strong>Username:</strong> {user.userName}
      </p>
      <p>
        <strong>Full Name:</strong> {user.fullName}
      </p>
      <p>
        <strong>Tip:</strong> {user.type}
      </p>
    </div>
  );
}

export default UserDetails;
