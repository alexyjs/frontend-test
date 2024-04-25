import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Container } from "react-bootstrap";
import AboutUs from "./pages/AboutUs";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./redux-store/stores";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container className="my-4">
          <Header />
          <Routes>
            <Route path="/aboutUs" element={<AboutUs />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
