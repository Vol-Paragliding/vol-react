import { useAuth } from "../../contexts/auth/useAuth";

const DashboardView = () => {
  const { state } = useAuth();
  if (!state.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard, {state.user.username}!</h1>
    </div>
  );
};

export default DashboardView;
