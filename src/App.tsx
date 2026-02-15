import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AddMoviePage from "./pages/AddMoviePage";
import EditMoviePage from "./pages/EditMoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-dark">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 md:py-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ekle" element={<AddMoviePage />} />
            <Route path="/duzenle/:id" element={<EditMoviePage />} />
            <Route path="/detay/:id" element={<MovieDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
