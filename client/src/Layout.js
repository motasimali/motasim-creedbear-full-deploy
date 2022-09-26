import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./modules/Shared/Header";

function Layout() {
  return (
    <>
      <Header />
      <main className="mainLayout">
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default Layout;
