import { FormEventHandler, useState } from "react";
import { useUserMutation } from "../hooks/useUser";

const LoginPage = () => {
  const [username, setUsername] = useState("");

  const { mutate } = useUserMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(username);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export { LoginPage };
