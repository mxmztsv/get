import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ErrorPage } from "./components/ErrorPage";
import { Dashboard } from "./pages/Dashboard";
import { Deposit } from "./pages/Deposit";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Navbar } from "./pages/Navbar";
import { NewPassword } from "./pages/NewPassword";
import { Profile } from "./pages/Profile";
import { Referral } from "./pages/Referral";
import { Signup } from "./pages/Signup";
import { Stake } from "./pages/Stake";
import { Terms } from "./pages/Terms";
import { Withdraw } from "./pages/Withdraw";
import { getItem } from "./utils/localStorage";
import { PathContext } from "./utils/PathContext";
import { UserContext } from "./utils/UserContext";

function App() {
  const [user, setUser] = useState();
  const [navPath, setNavPath] = useState([true, false, false, false]);

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const pathValue = useMemo(
    () => ({ navPath, setNavPath }),
    [navPath, setNavPath]
  );

  useEffect(() => {
    // login
    let user = getItem("user");
    if (!user) setUser(null);
    else setUser(user);
    console.log("[App] user:", user);
  }, []);

  return (
    <div className="global-wrapper">
      <UserContext.Provider value={userValue}>
        <PathContext.Provider value={pathValue}>
          <div className="App">
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/stake" element={<Stake />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/new-password" element={<NewPassword />} />
                <Route path="/login" element={<Login />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </PathContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
