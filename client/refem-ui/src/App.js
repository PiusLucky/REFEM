import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import EmailVerify from './components/EmailVerify';
import Documentation from './components/Documentation';
import Register from './components/Register';
import NotFound from './components/NotFound';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ForgotPassword/ResetPassword';
import { AuthContextProvider } from './context/AuthContext';


function App() {
  return (
    <AuthContextProvider>
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="/password-reset" exact element={<ResetPassword />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/email-verify" exact element={<EmailVerify />} />
          <Route path="/documentation" exact element={<Documentation />} />
          <Route path="*" element={<NotFound />} />       
        </Switch>
      </BrowserRouter>
    </div>
    </AuthContextProvider>
  );
}

export default App;
