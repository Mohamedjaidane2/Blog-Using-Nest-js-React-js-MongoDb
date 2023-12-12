import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import About from "./pages/About";
import {Routes, Route, BrowserRouter,} from "react-router-dom";
import Podcast from "./pages/Podcast";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import { useEffect} from "react";
import axios from "axios";
import PageNotFound from "./pages/404NotFound";
import Article_Details from "./components/blog/Article_Details";
import Podcast_Details from "./components/blog/Podcast_Details";

export default function App() {

  return (
<BrowserRouter>
<Routes>
          <Route
       path={`/:blogLink/*`}
       element={
         <>
         
         <Navbar />
           <Blog  />
           <Footer />
      
         </>
       }
       />
        <Route
       path={`/:blogLink/:article_id`}
       element={
         <>
         <Navbar />
           <Article_Details/>
        <Footer />
         </>
       }
       />
     <Route
       path={`/:blogLink/about`}
       element={
         <>

        <Navbar />
           <About />
           <Footer />
        
            
         </>
       }
     />
     <Route
       path={`/:blogLink/podcast`}
       element={
         <>
         <Navbar />
           <Podcast />
           <Footer />
          
         </>
       }
     /> 

      <Route
       path='/notfound'
       element={
           <PageNotFound />
           
       }
     /> 
          <Route path="/dashboard/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
        
</BrowserRouter>
      
  );
}


