import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./authentication/login/login";
import Forgotpassword from "./authentication/forgotpassword/forgotpassword";
import Otpcheck from "./authentication/otpchecking/otpcheck";
import Resetpassword from "./authentication/resetpassword/resetpassword";
import Contactsupport from "./authentication/contactsupport/contactsupport";
import Dashboard from "./dashboard/dashboard";
import Assessment from "./dashboard/assessment/assessment";
import Message from "./dashboard/message/message";
import Notification from "./dashboard/notification/notification";
import Upload from "./dashboard/upload/upload";
import Home from "./dashboard/home/home";
import ProtectedRoute from "./authentication/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import SelectionPage from "./dashboard/SelectionPage/SelectionPage";
const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/message" element={<Message />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/selection" element={<SelectionPage />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/otpcheck" element={<Otpcheck />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/contactsupport" element={<Contactsupport />} />
      </Routes>
    </Router>
  );
};
export default App;
