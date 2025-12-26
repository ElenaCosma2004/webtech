import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); //sa obtim functia navigate
  return (
    <>
      <p>Home</p>
      <button
        onClick={() => {
          navigate("/tasks");
        }}
      >
        Go to tasks
      </button>
    </>
  );
};
export default Home;
