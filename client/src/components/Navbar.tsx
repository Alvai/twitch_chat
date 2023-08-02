import { useUser, useUserMutation } from "../hooks/useUser";
import { Button } from "./Button";

const Navbar = () => {
  const { data: user } = useUser();
  const { mutate } = useUserMutation();

  const logout = () => {
    mutate(null);
  };

  return (
    <nav className="flex w-full justify-between p-2">
      <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
        Twitch chat clone
      </h1>
      <div className="flex items-center gap-2">
        {user && <p>Logged as {user}</p>}
        {user && (
          <Button type="button" onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
