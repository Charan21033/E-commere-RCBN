
import './App.css';

import {Route,Routes} from "react-router-dom"
import CustomerRoutes from './Routers/CustomerRoutes';
import {useSelector} from "react-redux"






function App() {
  
  return (
     <div  >
      <Routes>
  <Route path="/*" element ={<CustomerRoutes/>} ></Route>
</Routes> 



     
    </div>   

    
  );
}

export default App;
