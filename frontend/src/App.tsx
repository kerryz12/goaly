import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import { Navbar, Footer } from "./components";

function App() {
  return (
    <Router>
      <div className="font-sans bg-bg-page text-text-main min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          {" "}
          <Routes>
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
