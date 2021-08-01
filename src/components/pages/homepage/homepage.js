import React from "react";
import HomeSection from "../../HomeSection";
import {homeObjOne} from './Data'
// import Cards from '../Cards';
import PriceSection from "../../pricing/PriceSection";

function Home() {
  return (
    <>  
      <HomeSection {...homeObjOne}/>
      <PriceSection/>
    </>
  );
}

export default Home;
