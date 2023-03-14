import { library } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { faHeart, faFolder ,faPrint , faLink, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './components/Navbar';
import Highlighter from "react-highlight-words";
import TreeList from './components/TreeList';
import { FacebookShareButton, FacebookIcon ,EmailShareButton , EmailIcon  } from 'react-share';
import { TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import Comments from './components/Comments';
import Generate from './components/Generate';
import ReactToPrint, { useReactToPrint } from 'react-to-print';



export default function Article() {
    const { id } = useParams();
    const [Article, setDataArticle] = useState([]);
    const [search, setData] = useState([]);

    const history = useNavigate();

    const [active, setActive] = useState([]);

    const ref = useRef();



 
  
    const copy = async () => {
      await navigator.clipboard.writeText(window.location);
      alert('URL copied');
    }










    const [user, setUser] = useState([]);
    const [commentaire, setComments] = useState([]);

    //   library.add(   )
    const fetchDataArticle = () => {
        axios.get('http://localhost:3000/Article')
            .then(res => {
                setDataArticle(res.data);
            }
            ).catch(err => console.log(err))
    }


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



    let url = "http://localhost:3001/3";


    // const fetchData = async () => {
    //     await axios.get('http://localhost:3000/Article')
    //         .then(res => {
    //             setData(res.data);
    //         }

    //         ).catch(err => console.log(err))
    // }


    useEffect(() => {
        axios.get('http://localhost:3000/Article/' + id).
            then(res => setDataArticle(res.data)).
            catch(err => console.log(err))
        fetchDataArticle();
        fetchDataUser();
        fetchDataComment();
    }, [])

    let fg = 0;
    // Array.isArray(Article) &&  console.log(  Article.find(art => art.id == id))

    const handleSubmit = (e) => {
        e.preventDefault();
        const ell = Array.isArray(Article) && Article.find(art => art.id == id)
        setActive(ell.favortite == 0)
        console.log(ell)
        // setDataArticle({ favortite : 1 })
        axios.put("http://localhost:3000/Article/" + id, {
            id: ell.id,
            Name: ell.Name,
            Text: ell.Text,
            Image: "https://images.pexels.com/photos/4160068/pexels-photo-4160068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            Ref: ell.Ref,
            nbr: ell.nbr,
            favortite: ell.favortite == 0 ? 1 : 0
        }).then(res => {

            history("/")
        }
        )
    }

      

        const handlePrint = useReactToPrint({
           content: () => ref.current 
        });




    return (
        <div>
          

            <Navbar />
            {/* <Listinig /> */}
            <TreeList />
            <button onClick={copy}   className="btn btn-link" style={{ fontSize : "22px" , 
                  zIndex : 3 , 
                  position : "absolute" , 
                  top : "173px" ,
                  left : "43%"
            
              }}>
            <FontAwesomeIcon icon={faLink} >
            </FontAwesomeIcon>
            </button> 
    
                <div className='float-md-end  nav-mini'  >
                   <Link  className='monlin  styleNav avs' id='click'  to={`/${id}`}>Article</Link>
                   <Link  className='styleNav' id='link2'  to={`/Comments/${id}`}>Comments</Link>
                </div>


             <div>
             <Link  className='monlin'  to="/favorite">
                <FontAwesomeIcon icon={faFolder}  id='folder'  style={{
                    fontSize : "22px" ,
                    zIndex : 3 ,  
                    position : "absolute" , 
                    top : "184px" ,
                    left : "49%"
                }} >

                </FontAwesomeIcon>
             </Link>
             </div>


     
            {/* <SearchList datas={search} /> */}
          <div className="container col-6" id='articlo'>
                {
                    Article && Array.isArray(Article) &&
                    Article.filter(art => art.id == id).map((item, ind) => (
                        <div className='container' key={item.id} id="contents"   ref={ref}>

                        <button  className='btn btn-link' onClick={handlePrint} style={{
                             zIndex : 3 , 
                             position : "absolute" , 
                             top : "178px" ,
                             left : "38%"

                          }} >
                        <FontAwesomeIcon icon={faPrint}  id='print' style={{ fontSize : "22px"  }} ></FontAwesomeIcon>
                        </button>

                            <div className='container card h-auto' id='Articales' style={{ userSelect: "none" }}>
                                <input className="form-control mt-3" style={{ width: "50%", position: "relative", left: "300px" }} id="seacg" type="text" placeholder="Search" onChange={e => setData(e.target.value)} aria-label="Search" />

                                <><div class="w3-row w3-padding-64 card-body h-auto" id="about">
                                   <Generate target={"contents"}  withPara={"para"}  art={"articlo"} />
                                   
                                    <div class="w3-col m6 w3-padding-large w3-hide-small">
                                        <form onSubmit={(e) => handleSubmit(e)} >
                                            {
                                                <button className='btn btn-link' type='submit' id='favourite' style={{ cursor: "pointer" }}>
                                                    <FontAwesomeIcon icon={faHeart} id='col' color={item.favortite == 0 ? "gray" : "red"}  ></FontAwesomeIcon>
                                                </button>
                                            }
                                        </form>
                                        {/* <img id='img-article' src="https://images.pexels.com/photos/4160068/pexels-photo-4160068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" class="w3-round w3-image w3-opacity-min" alt="Table Setting" width="260" /> */}
                                    </div>
                                    <div class="w3-col m6 w3-padding-large">
                                        <div>
                                            {
                                                search == "" ?

                                                    <><h1 class="w3-center">{item.Name}</h1><br /><p class="w3-large para"  >{item.Text}</p></>
                                                    : <>
                                                        <h1 class="w3-center">{item.Name}</h1>
                                                        <Highlighter
                                                            highlightClassName="High"
                                                            searchWords={[search]}
                                                            autoEscape={true}
                                                            textToHighlight={
                                                                item.Text
                                                            } />
                                                    </>
                                            }
                                        </div>
                                    </div>
                                    <br />
                                    <FacebookShareButton
                                        url={url}
                                        quote={item.Name}
                                        hashtag={`#${item.Name}`}
                                    >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>

                                    <TwitterShareButton
                                        url={url}
                                        quote={item.Name}
                                        hashtag={item.Name}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>

                                    <WhatsappShareButton
                                        url={url}
                                        quote={item.Name}
                                        hashtag={item.Name}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                    <a className='btn btn-link' href={`mailto:yourmail?subject=${item.Name}&body=${item.Text}.`}>
                                        <FontAwesomeIcon icon={faMailBulk}  color="gray"  style={{ marginLeft: "3px" , fontSize : "22px",
                                         position : "relative" , top : "1px" }}>
                                        </FontAwesomeIcon>
                                    </a>


                                    {/* <EmailShareButton
                                        url={url}
                                        quote={item.Text}
                                        hashtag={item.Name}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        <EmailIcon  size={32} round/>
                                    </EmailShareButton> */}
                              
                                </div>
                                    <hr />
                                </>
                                <br />
                                <>
                                </>
                            </div>
                        </div>
                    ))
                }
            </div>


       




        </div>
    )
}
