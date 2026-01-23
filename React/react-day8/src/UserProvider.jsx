import { useState } from "react";
import UserContext from "./UserContext";
function UserProvider({ childern }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {childern}
    </UserContext.Provider>
  );
}
export default UserProvider;
