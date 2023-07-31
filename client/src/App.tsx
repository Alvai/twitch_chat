import { Navbar } from "./components/navbar";
import { useUser } from "./hooks/useUser";
import { LoginPage } from "./pages/LoginPage";

const App = () => {
  const { data: user, isLoading: isAuthLoading } = useUser();

  if (isAuthLoading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      {user ? <p>No messages</p> : <LoginPage />}
    </div>
  );
};

export default App;
