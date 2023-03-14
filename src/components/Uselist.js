import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Comments from './Comments';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import TreeList from './TreeList';




export default function Uselist() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [commentaire, setComments] = useState([]);

  const fetchDataUser = () => {
    axios.get('http://localhost:3000/users')
      .then(res => {
        setUser(res.data);
      }
      ).catch(err => console.log(err))
  }


  const fetchDataComment = () => {
    axios.get('http://localhost:3000/Comments')
      .then(res => {
        setComments(res.data);
      }
      ).catch(err => console.log(err))
  }



  useEffect(() => {
    fetchDataUser();
    fetchDataComment();
  })



  return (
    <div>




      <Navbar />
      {/* <Listinig/> */}
      <TreeList />
          <div className='float-md-end'  style={{position : "absolute"  , right: "253px" , top: "150px", Zindex: 3 }} >
                   <Link className='monlin styleNav'  to={`/${id}`}>Article</Link>
                   <Link className='styleNav avs'  to={`/Comments/${id}`}>Comments</Link>
          </div>


      <div className="container card mt-3" style={{ width: "45%"  , position : "relative" , left : "100px" }}  >
        <div className="card-body">
          <h4 >Comments :</h4>
        </div>
        {commentaire.filter(comt => comt.RefArticle == id).map(comm => (
          <div className="card-body">
            {/* <p  >{ fg =  comm.userid  }</p> */}
            <a href='#' ><FontAwesomeIcon icon={faUser} id='col' style={{ fontSize: "18px" }}  ></FontAwesomeIcon>
              {user.filter(useArt => useArt.id == comm.userid).map(oneUser => (
                oneUser.name
              ))}
            </a>
            <p className='card-title mt-2'>{comm.Text}</p>
          </div>
        ))}
      </div>

      <Comments />

    </div>
  )
}
