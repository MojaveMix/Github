import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter , Routes, Route, useNavigate, useParams } from "react-router-dom";
import './App.css';
import Article from './Article';
import Home from "./components/Home";
import Listinig from './components/Listinig';
import Navbar from './components/Navbar';
import NoPage from "./components/NoPage";
import SearchList from "./components/SearchList";
import Uselist from "./components/Uselist";






function App() {
  const { ids } = useParams();

  // const history = useNavigate();

  const [inputData, setInputData] = useState([]);
  const [search, setData] = useState([]);


  useEffect(() => {
      axios.get('http://localhost:3000/Article/').
          then(res => setInputData(res.data)).
          catch(err => console.log(err))
  }, []);

  const keys = ["Name" , "Text" ];
  // data.filter((item)=> keys.some((key)=> item[key].toLowerCase().includes(search) ))
//   const Searcy =(data)=>{
//     let para = document.getElementById("para");
//      if(search != ""){
    
   
//      return    
//   }
// }


  

  return (
    <div className="App">
<BrowserRouter>
     <Routes>
        <Route   path="/"   element={<Home />}  />         
        <Route   path="/:id" element={<Article/>}  /> 
        <Route   path="/Comments/:id" element={<Uselist />}  /> 
        <Route   path="/*" element={<NoPage/>}  /> 
        <Route   path="/favorite" element={<SearchList/>}  /> 

    </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
