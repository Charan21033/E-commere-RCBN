import React, {  useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";


const HomeSectionCarosel = ({data,sectionName}) => {
    const [activeIndex,setActiveIndex] =useState(0);
    
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };
  const slidePrev = () => {
    setActiveIndex(prevIndex => Math.max(prevIndex - 1, 0));
};

const slideNext = () => {
  setActiveIndex(prevIndex => Math.min(prevIndex + 1, data.length - 1));
};

// const slidePrev =()=>setActiveIndex(activeIndex-1);
// const slideNext =()=>setActiveIndex(activeIndex+1);

// const syncActiveIndex=({item})=> { return setActiveIndex(item)};

  const items = data.slice(0,10).map((item,index) => 
  
    <HomeSectionCard key={index} product={item} />  
  );
  // console.log("product",)
 // Custom navigation buttons
 const renderPrevButton = ({ isDisabled }) => (
  <Button
      disabled={isDisabled}
      onClick={slidePrev}
      variant="contained"
      className="z-50"
      sx={{
          position: "absolute",
          top: "8rem",
          left: "0rem",
          transform: "translateX(-50%) rotate(-90deg)",
          bgcolor: "white",
      }}
      aria-label="prev"
  >
      <KeyboardArrowLeftIcon
          sx={{ transform: "rotate(90deg)", color: "black" }}
      />
  </Button>
);

const renderNextButton = ({ isDisabled }) => (
  <Button
      disabled={isDisabled}
      onClick={slideNext}
      variant="contained"
      className="z-50"
      sx={{
          position: "absolute",
          top: "8rem",
          right: "0rem",
          transform: "translateX(50%) rotate(90deg)",
          bgcolor: "white",
      }}
      aria-label="next"
  >
      <KeyboardArrowLeftIcon
          sx={{ transform: "rotate(90deg)", color: "black" }}
      />
  </Button>
);




return (
  <div className="border">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5">{sectionName}</h2>
      <div className="relative p-5">
          <AliceCarousel
              items={items}
              responsive={responsive}
              disableDotsControls
              mouseTracking
              activeIndex={activeIndex}
              onSlideChanged={(item) => setActiveIndex(item.item)}
              renderPrevButton={renderPrevButton} // Custom prev button
              renderNextButton={renderNextButton} // Custom next button
          />
      </div>
       <span className="  hover:text-blue-600 flex justify-end  cursor-pointer"
       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
       >↑ Browse More Collection from Top Bar </span>
  </div>
);
};

export default HomeSectionCarosel;
