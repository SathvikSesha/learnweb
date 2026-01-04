import { useState, useEffect } from "react";
import "./formscss.css";
function Forms() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    gender: "",
    country: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name) return setMessage("Name is required");
    if (form.age <= 0) return setMessage("Enter valid age");
    if (!form.email) return setMessage("Email is required");
    if (!form.password) return setMessage("Password is required");
    if (!form.gender) return setMessage("Gender is required");
    if (!form.country) return setMessage("Country is required");

    setUsers((prev) => [...prev, form]);
    setMessage("Form submitted successfully!");

    setForm({
      name: "",
      age: "",
      email: "",
      password: "",
      gender: "",
      country: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };
  const reset = () => {
    setForm({
      name: "",
      age: "",
      email: "",
      password: "",
      gender: "",
      country: "",
    });
  };
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      <div className="background">
        <span className="dot dot1"></span>
        <span className="dot dot2"></span>
        <span className="dot dot3"></span>
        <span className="dot dot4"></span>
        <span className="dot dot5"></span>
        <span className="dot dot6"></span>
      </div>
      <div className="container">
        <h1>Welcome to Portal </h1>
        <h2>Register Here</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <input
            name="age"
            type="number"
            value={form.age}
            placeholder="Enter your age"
            onChange={handleChange}
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <div className="radios">
            <h3>Gender:</h3>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={form.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={form.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>

          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="china">China</option>
          </select>

          <button type="submit">Submit</button>
          <button type="reset" onClick={reset}>
            Reset
          </button>
        </form>

        {message && <p>{message}</p>}

        <ul>
          {users.map((u) => (
            <li key={u.email}>
              {u.name} - {u.age} - {u.email} - {u.gender} - {u.country}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Forms;
