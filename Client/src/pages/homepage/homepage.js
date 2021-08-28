import React from "react";
import HomeSection from "../../components/HomeSection";
import {homeObjOne} from './Data'
import PriceSection from "../../components/pricing/PriceSection";

function Home() {
  return (
    <>  
      <HomeSection {...homeObjOne}/>
      <PriceSection/>
    </>
  );
}

export default Home;
