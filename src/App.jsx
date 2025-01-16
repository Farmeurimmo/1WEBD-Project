import {Route, Routes} from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Search from "./pages/Search.jsx";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
    return (
        <div className={"w-screen"}>
            <Navbar/>

            <div className={"min-h-screen"}>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/search" element={<Search/>}/>
                    <Route path="/movie" element={<Movie/>}/>
                </Routes>
            </div>

            <Footer/>
        </div>
    )
}