import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Container } from "react-bootstrap";
import AboutUs from "./pages/AboutUs";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import { store } from "./redux-store/stores";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container className="my-4">
          <Header />
          <Routes>
            <Route path="/aboutUs" element={<AboutUs />} />
          </Routes>
          <Routes>
            <Route path="/signIn" element={<SignIn />} />
          </Routes>
          <Routes>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
