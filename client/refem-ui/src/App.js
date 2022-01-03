import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import EmailVerify from './components/EmailVerify';
import { AuthContextProvider } from './context/AuthContext';


function App() {
  return (
    <AuthContextProvider>
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/email-verify" exact element={<EmailVerify />} />
        </Switch>
      </BrowserRouter>
    </div>
    </AuthContextProvider>
  );
}

export default App;
