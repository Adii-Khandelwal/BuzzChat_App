import React,{Suspense, lazy} from 'react';
import {BrowserRouter,Route,Routes } from 'react-router-dom';
// import Register from "./pages/Register";
// import Login from './pages/Login';
// import Chat from './pages/Chat';
// import SetAvatar from './pages/setAvatar';

const Chat = lazy(()=> import("./pages/Chat"));
const Login = lazy(()=> import("./pages/Login"));
const Register = lazy(()=> import("./pages/Register"));
const SetAvatar = lazy(()=>import("./pages/setAvatar"));
export default function App() {
  return <BrowserRouter>
  <Suspense fallback={<></>}>
  <Routes>
    <Route path="/register" element={<Register />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/" element={<Chat/>}/>
    <Route path="/setAvatar" element={<SetAvatar/>}/>
  </Routes>
  </Suspense>
  </BrowserRouter>
}
