import logo from './logo.svg';
import './App.css';
import Nav from './Nav'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>

     <Nav />
     <Routes>
      <Route path='/' element={<h1>Products</h1>} />
      <Route path='/add' element={<h1>Add Products</h1>} />
      <Route path='/update' element={<h1>Update Products</h1>} />
      <Route path='/logout' element={<h1>logout</h1>} />
      <Route path='/profile' element={<h1>profile</h1>} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
