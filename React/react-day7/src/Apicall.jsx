import Usefetch from "./Usefetch";
function Apicalls() {
  const {
    data: users,
    loading,
    error,
  } = Usefetch("https://jsonplaceholder.typicode.com/users");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
