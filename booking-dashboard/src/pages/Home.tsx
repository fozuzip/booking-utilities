import { LogoutButton } from "../components/logout-button";

function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <LogoutButton />
    </h1>
  );
}

export default Home;
