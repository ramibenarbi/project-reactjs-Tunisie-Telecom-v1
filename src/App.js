import React, { useState } from "react";

import Login from "./screens/Login";
import Register from "./screens/Register";
import SendComplaint from "./screens/SendComplaint";
import FctAdmin from "./screens/FctAdmin";
import ForgetPassword from "./screens/ForgetPassword";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./config/ProtectedRoute";
import Complaints from "./screens/Complaints";
import SendComplaintAdmin from "./screens/SendComplaintAdmin";
import TreatComplaints from "./screens/TreatComplaints";
function App() {
  const [user, setUser] = useState(false);

  const handleLogin = (e) => {
    setUser(true);
  };
  const handleLogout = (e) => {
    setUser(false);
  };
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          handleLogin={handleLogin}
          render={() => (
            <Login user={user.toString()} handleLogin={handleLogin} />
          )}
        />
        <Route exact path="/Signup" component={Register} />

        <Route exact path="/ForgetPassword" component={ForgetPassword} />
        <ProtectedRoute
          path="/SendComplaint"
          user={user}
          handleLogout={handleLogout}
          component={SendComplaint}
        />
        <ProtectedRoute
          path="/FctAdmin"
          handleLogout={handleLogout}
          user={user}
          component={FctAdmin}
        />
        <ProtectedRoute
          path="/Complaints"
          handleLogout={handleLogout}
          user={user}
          component={Complaints}
        />
        <ProtectedRoute
          path="/SendComplaintAdmin"
          handleLogout={handleLogout}
          user={user}
          component={SendComplaintAdmin}
        />
        <ProtectedRoute
          path="/TreatComplaints"
          handleLogout={handleLogout}
          user={user}
          component={TreatComplaints}
        />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
