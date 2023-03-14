import React, { useEffect, useState } from 'react'
import Article from '../Article';
import 'bootstrap/dist/css/bootstrap.min.css'
import { TreeItem, TreeView } from '@mui/lab';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { faBookBookmark , faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Navbar from './Navbar';
import TreeList from './TreeList';




export default function SearchList() {
  // const filtered = datas.map(item =>  <Article key={item.id} datasi={item} />); 
  const [Article, setDataArticle] = useState([]);
  const fetchDataArticle = () => {
    axios.get('http://localhost:3000/Article')
      .then(res => {
        setDataArticle(res.data);
      }
      ).catch(err => console.log(err))
  }


  useEffect(() => {
    fetchDataArticle()
  }, [])
  return (

    <div>
      <Navbar />
      <TreeList />

      <div className='container col-md-3 float-start mt-5 favorita'>
        <br />
        <FontAwesomeIcon icon={faFolder}  style={{ position :"relative" , fontSize : "17px" , top : "24px" , left :"18px"   }}  ></FontAwesomeIcon>

        <h3 className='col-md-10' style={{ fontSize: "22px", position: "relative", left: "48px" ,  marginRight: "10px"  }}>
        Mes favorites</h3>

        <br />

        <div className="container ">

          {Article && Array.isArray(Article) && Article.map(item => (
            item.favortite == 1 ?
                <ul className="list-group">
                   <li className="list-group-item">
                   <Link to={`/${item.id}`} style={{ textDecoration: "none" }}>
                   <FontAwesomeIcon icon={faBookBookmark} id='col' style={{ fontSize : "15px" }} color= "red" ></FontAwesomeIcon>
                   {item.Name}
                   </Link>
                   </li>
                 </ul>
                 :""
          ))}
        </div>
      </div>

    </div>
  )
}
