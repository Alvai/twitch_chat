import { Navbar } from "./components/Navbar";
import { useUser } from "./hooks/useUser";
import { LiveChat } from "./pages/LiveChat";
import { LoginPage } from "./pages/LoginPage";

const App = () => {
  const { data: user, isLoading: isAuthLoading } = useUser();

  if (isAuthLoading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      {user ? <LiveChat /> : <LoginPage />}
    </div>
  );
};

export default App;
