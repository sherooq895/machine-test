import './App.css';
import { Route, Routes } from "react-router-dom";
import Admin from './Pages/Admin/Admin';
import Dashboard from "./component/Dashboard/Dashboard";
import EmployeeList from './Pages/Admin/Home';
import AdminLogin from './Pages/Admin/Login';
import Application from './Pages/Admin/Application';
import Error from './Pages/Admin/Error';



function App() {
  return (
    <div>

      <Routes>
        <Route path='/login' element={<AdminLogin />} />
        <Route element={<Admin />} >
          <Route path='/' element={<Dashboard />} />
          <Route path='/createEmployee' element={<Application />} />
          <Route path='/EmployeeList' element={<EmployeeList />} />
        </Route>
          <Route path='/Error' element={<Error />} />
      </Routes>
     
    </div>
  );
}

export default App;
