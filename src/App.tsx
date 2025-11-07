import { Button, Icon, Layout } from "@stellar/design-system";
import "./App.module.css";
import ConnectAccount from "./components/ConnectAccount.tsx";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
// import Home from "./pages/_Home.tsx"
import Debugger from "./pages/Debugger.tsx";
import { Home } from "./pages/Home.tsx";
import OnBoardPage from "./pages/OnBoard.tsx";
import { UploadSamplePage } from "./pages/UploadSamplePage.tsx";
import ExplorePage from "./pages/ExplorePage.tsx";
import InAppLayout from "./components/layout/InAppLayout.tsx";

const AppLayout: React.FC = () => (
  <main>
    <Layout.Header
      projectId="My App"
      projectTitle="My App"
      contentRight={
        <>
          <nav>
            <NavLink
              to="/debug"
              style={{
                textDecoration: "none",
              }}
            >
              {({ isActive }) => (
                <Button
                  variant="tertiary"
                  size="md"
                  onClick={() => (window.location.href = "/debug")}
                  disabled={isActive}
                >
                  <Icon.Code02 size="md" />
                  Debugger
                </Button>
              )}
            </NavLink>
          </nav>
          <ConnectAccount />
        </>
      }
    />
    <Outlet />
    <Layout.Footer>
      <span>
        © {new Date().getFullYear()} My App. Licensed under the{" "}
        <a
          href="http://www.apache.org/licenses/LICENSE-2.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apache License, Version 2.0
        </a>
        .
      </span>
    </Layout.Footer>
  </main>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/onboard" element={<OnBoardPage />} />
      <Route path="/upload-sample" element={<UploadSamplePage />} />
      <Route element={<InAppLayout />}>
        <Route path="/explore" element={<ExplorePage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/debug" element={<Debugger />} />
        <Route path="/debug/:contractName" element={<Debugger />} />
      </Route>
    </Routes>
  );
}

export default App;
