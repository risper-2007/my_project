import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Mycarousel from  './components/Mycarousel';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Footer from './components/Footer';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        
        <h1 className='text-dark'>✩░▒▓▆▅▃▂▁𝐖𝐎𝐍𝐃𝐄𝐑 𝐋𝐔𝐗𝐄 𝐓𝐎𝐔𝐑𝐒 𝐀𝐍𝐃 𝐓𝐑𝐀𝐕𝐄𝐋𝐒▁▂▃▅▆▓▒░✩</h1>
      </header>
      {/* navigating links */}
      <nav className='bg-dark'>
        <Link to ={'/signup'} className='navlinks'>Sign up</Link>
        <Link to={'/signin'} className='navlinks'>Sign in</Link>
        <Link to ={'/addproduct'} className='navlinks'>Add Destination</Link>
        <Link to ={'/'} className='navlinks'>Get Destination</Link>
        

      </nav><br />
      <Mycarousel/>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element = {<Signin/>}/>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/' element={ <Getproduct/>}/>
        <Route path='/makepayment' element={<Makepayment/>}/>
      </Routes>
     
      <Footer/>
      
      

    </div>
    </Router>
  );
}

export default App;