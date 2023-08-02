import { FormEventHandler, useState } from "react";
import { useUserMutation } from "../hooks/useUser";
import { Button } from "../components/Button";

const LoginPage = () => {
  const [username, setUsername] = useState("");

  const { mutate } = useUserMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(username);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-2 ">
        <div className="space-y-1">
          <label htmlFor="username">Username</label>
          <input
            className="shadow-sm h-10 focus:ring-indigo-500 border py-2 px-3 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            type="text"
            id="username"
            value={username}
            placeholder="joe"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <Button
          type="submit"
          className="w-full justify-center"
          disabled={username.length === 0}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export { LoginPage };
