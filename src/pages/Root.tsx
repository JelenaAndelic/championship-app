import { Outlet } from "react-router";
import MainNavigation from "../components/MainNavigation";

const Root = () => {
  return (
    <>
      <nav>
        <MainNavigation />
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
