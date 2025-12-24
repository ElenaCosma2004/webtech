import "./User.css";
function User(props) {
  const { item, onClick } = props;
  return (
    <div className="user" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="userName">{item.userName}</div>
      <div className="fullName">{item.fullName}</div>
    </div>
  );
}

export default User;
