import Profile from "./Profile.jsx";

function App() {
  return (
    <header>
      <Profile
        name="sathvik"
        age={19}
        skills={["java", "python", "javascript"]}
      />
    </header>
  );
}

export default App;
