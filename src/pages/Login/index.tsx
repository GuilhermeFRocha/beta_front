import { useState } from "react";
import useAuthStore from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login({ username, password, email });

    if (isAuthenticated) {
      await navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};
