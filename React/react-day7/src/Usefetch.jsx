import { useEffect, useState } from "react";
function Usefetch(url) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchdata() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(url);
        if (!res.ok) throw new Error("Unable to fetch data");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError("Unable to fetch Data");
        console.log("Cannot fetch data");
      }
    }
    fetchdata();
  }, [url]);
  return { users, loading, error };
}
export default Usefetch;
