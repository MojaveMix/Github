import React, { useEffect, useState } from 'react'
import { TreeItem, TreeView } from '@mui/lab'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';



const getTreeItemsFromData = datas => {

    return datas.map(treeItemData => {
        let children = undefined;
        if (treeItemData.children && treeItemData.children.length > 0) {
            children = getTreeItemsFromData(treeItemData.children);
        }
        return (
            <Link to={`/${treeItemData.Ref}`}>
                <TreeItem
                    key={treeItemData.id}
                    nodeId={treeItemData.id}
                    label={treeItemData.name}
                    children={children}
                />
            </Link>

);



    });
};



const DataTreeView = ({ treeItems }) => {
    return (
        <div className='container col-4' id='por'>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {getTreeItemsFromData(treeItems)}
            </TreeView>
        </div>

    );
};


export default function TreeList() {

    const [data, setData] = useState([]);
    const [Article, setDataArticle] = useState([]);
    const [search2, setData2] = useState([]);

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

    useEffect(() => {
        fetchData()
        fetchDataArticle()
    }, [])


    let fg = 0;
    let children = undefined;

    return (

        <div className='container p-0'  >
            <input className="form-control me-2" id="seacg" type="text" placeholder="Search" onChange={e => setData2(e.target.value)} aria-label="Search2" />



            {
                search2 == "" ?
                    <DataTreeView treeItems={data} />
                    :
                    data.filter(item => item.name.includes(search2)).length > 0 ?

                        data.filter(item => item.name.includes(search2)).map(items => (
                            <TreeView
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                             >
                                {items.children && items.children.length > 0}
                                <Link to={`/${items.Ref}`}>
                                    <TreeItem
                                        key={items.id}
                                        nodeId={items.id}
                                        label={items.name}
                                        children={children}
                                    />
                                </Link>
                            </TreeView>
                        ))
                        :
                        data.map(item => (
                            item.children.filter(filter => filter.name.includes(search2)).map(ite => (
                                <TreeView
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                >
                                  {ite.children && ite.children.length > 0
                                     ?
                                    <Link to={`/${ite.Ref}`}>
                                        <TreeItem
                                            key={ite.id}
                                            nodeId={ite.id}
                                            label={ite.children.name}
                                            children={children}
                                        />
                                     </Link>
                                     :
                                     ""
                                  }
                                </TreeView>
                                  
                            ))
                        ))
            }





        </div>
    )
}
