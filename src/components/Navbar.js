import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';



export default function Navbar() {
const [Pays , setPays ] = useState([]);


const fetchDataPays= () => {
  axios.get('http://localhost:3000/Pays')
    .then(res => {
      setPays(res.data);
    }
    ).catch(err => console.log(err))
}

useEffect(() => {
  fetchDataPays();
})




  return (
    <div>
  <header>
	<nav className="navbar navbar-expand-lg  bg-danger ">
		<div className="container">
			<Link  to="/"  className="navbar-brand text-white">Code</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nvbCollapse" aria-controls="nvbCollapse">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="nvbCollapse">
					<ul className="navbar-nav ml-auto">
			<li className="nav-item dropdown">
			<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
			Codes Article
			</a>
			<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
				{Pays.map(pay => (
					pay.id == 3  ?
				<li><a className="dropdown-item" href="#">{ pay.name }</a></li>
				: 
				<li><a className="dropdown-item disabled" href="#">{ pay.name }</a></li>
				))}
			</ul>
			</li>
					<li className="nav-item  pl-1">
						<a className="nav-link" href="#">documentation</a>
					</li>
					<li className="nav-item pl-1">
						<a className="nav-link" href="#">Jurisprudence</a>
					</li>
					<li className="nav-item pl-1">
						<a className="nav-link" href="#">Services</a>
					</li>
					<li className="nav-item pl-1">
						<a className="nav-link" href="#">Aide</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	</header>
    </div>
  )
}
