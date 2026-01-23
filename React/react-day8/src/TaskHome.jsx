import { useState } from "react";

function TaskHome() {
  const [user, setUser] = useState(null);
  return <p>{user}</p>;
}
export default TaskHome;

// using the context
// import { useContext } from "react";
// import UserContext from "../context/UserContext";

// function Profile() {
//   const { user, setUser } = useContext(UserContext);

//   return <h2>{user ? user.name : "Guest"}</h2>;
// }
