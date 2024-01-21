import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Layout from './Pages/Layout';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<SignUp />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
