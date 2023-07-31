import { useUser, useUserMutation } from "../hooks/useUser";

const Navbar = () => {
  const { data: user } = useUser();
  const { mutate } = useUserMutation();

  const logout = () => {
    mutate(null);
  };

  return (
    <nav>
      <h1>Twitch Chat Clone</h1>
      <div>
        {user && <p>Logged as {user}</p>}
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
};

export { Navbar };
