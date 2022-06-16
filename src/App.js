import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Deposit } from "./pages/Deposit";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Navbar } from "./pages/Navbar";
import { Profile } from "./pages/Profile";
import { Referral } from "./pages/Referral";
import { Signup } from "./pages/Signup";
import { Stake } from "./pages/Stake";
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
    console.log(user);
  }, []);

  return (
    <div className="global-wrapper">
      <UserContext.Provider value={userValue}>
        <PathContext.Provider value={pathValue}>
          <div className="App">
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/stake" element={<Stake />}></Route>
                <Route path="/referral" element={<Referral />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/deposit" element={<Deposit />}></Route>
                <Route path="/withdraw" element={<Withdraw />}></Route>
              </Routes>
            </BrowserRouter>
          </div>
        </PathContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
