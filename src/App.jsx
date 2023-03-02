import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Chat from './pages/Chat';
import { useSelector } from 'react-redux';

function App() {
    const user = useSelector((state) => state.userReducer.user);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route
                    path='/'
                    element={user ? <Chat /> : <Navigate to={'/login'} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
