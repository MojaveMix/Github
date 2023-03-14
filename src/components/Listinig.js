import React from 'react'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem, TreeView } from '@mui/lab' ;





export default function Listinig() {
    const [data, setData] = useState([]);
    const [Article, setDataArticle] = useState([]);

    const fetchData = async () => {
        await axios.get('http://localhost:3000/Parties')
            .then(res => {
                setData(res.data);
            }

            ).catch(err => console.log(err))
    }


    const fetchDataArticle = () => {
        axios.get('http://localhost:3000/Article')
            .then(res => {
                setDataArticle(res.data);
            }
            ).catch(err => console.log(err))
    }




    // await waiting for fetching the data :
    useEffect(() => {
        fetchData()
        fetchDataArticle()
    }, [])

    let fg = 0




    // const Founded = (ids) => {
    //     let founded = Article.filter((item) => item.Ref === ids)
    //     return founded;
    // }
    // console.log(Founded(1))

  

    return (
        <div className='container listy'>
            <br />
        <br />
        {  data  &&  data.sort((a, b) => a.level < b.level ? 1 : -1).map((item , index)   => (
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
               >

                <TreeItem nodeId="1" label={item.name}>
                {item.Partie.name.map((itname , ind)  => (
                    <div>
                  <p  style={{ display : "none" }} > {fg = itname.id}</p>
                    <TreeItem nodeId={`${itname.nbr}`} label={itname.SmTitre} >
                         { Article.map((art) => (
                                       <TreeView>
                                     {
                                     art.Ref == fg ?    
                                     <Link to={`/${art.id}`}>
                                     <TreeItem nodeId={`${itname.nbr}`}   label={art.Name} />
                                     </Link>
                                       : ""
                                       }
                                     </TreeView>
                                ))}
                    </TreeItem>
                    </div>
                ))
                }
                </TreeItem>
                {/* <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="10" label="OSS" />
                    <TreeItem nodeId="6" label="MUI">
                        <TreeItem nodeId="8" label="index.js" />
                    </TreeItem>
                </TreeItem> */}
              </TreeView>

        ))
        
        }

        </div>
    )
}




