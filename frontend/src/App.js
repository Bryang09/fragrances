import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Nav from "./components/Nav";
import Authorized from "./pages/Authorized";
import Fragrance from "./pages/Fragrance";
import EditFragrances from "./pages/EditFragrances";
import EditFragrance from "./pages/EditFragrance";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authorized" element={<Authorized />} />
            <Route path="/fragrance/:id" element={<Fragrance />} />
            <Route path="/edit" element={<EditFragrances />} />
            <Route path="/edit/:id" element={<EditFragrance />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
