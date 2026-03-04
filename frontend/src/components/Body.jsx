import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <NavBar/>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet/>
      </main>

      <Footer/>

    </div>
  )
}

export default Body



// import { Outlet } from "react-router-dom"
// import NavBar from "./NavBar"
// import Footer from "./Footer"
// const Body = () => {
//   return (
//     <div>
//         <NavBar/>
//         <div className="pt-20">
//             <Outlet/>
//         </div> 
//         <Footer/>
//     </div>
//   )
// }
// export default Body