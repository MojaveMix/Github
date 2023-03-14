import React from 'react'
import Comments from './Comments'
import Listinig from './Listinig'
import Navbar from './Navbar'
import SearchList from './SearchList'
import TreeList from './TreeList'

export default function Home() {
  return (
    <div>
   <Navbar/>
   {/* <Listinig/> */}
   <TreeList />
   {/* <SearchList/>   */}
    </div>
  )
}
