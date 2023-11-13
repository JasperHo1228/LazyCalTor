import React from "react";
import '../../style/Warningtext.css'
import { LazyLoadImage } from "react-lazy-load-image-component";
import Aladdin from "../../Image/Aladdin.png"
import Jasmine from "../../Image/Jasmine-Profile1.webp"

const Warningtext = ({ number,toggled }) => {
    if (number < 0 || number === 0) {
        return (
          <div  className="warning-text">
            <br />
            Are you joking? Don't mess with me you twat!
            <br />
            咪撚玩野啦屌!
            <br/>
            <LazyLoadImage src={Aladdin} className="aladdin"/>
          </div>
        );
      } 
      else if (number === 1) {
        return (
          <div  className="warning-text">
            <br />
            Are you out of your mind? <br/>Use your calculator you big brain!
            <br />
            <LazyLoadImage src={Aladdin} className="aladdin"/>
          </div>
        );
      } 
      else if (number >= 200) {
        return (
          <div className="warning-text">
            <br />
            How is it that so many people are having dinner together?
            <br />
            What kind of banquet is this? No more than 200 IDIOTS!
            <br/>
            <LazyLoadImage src={Aladdin} className="aladdin" alt="Aladdin" />
          </div>
        );
      }
      else {
        return (
          <div  className="warning-text">
            {toggled ? <h3 className="warning-title-1">Paid By One Person Mode</h3>
            :<h3 className="warning-title-2">Paid By Different Person Mode</h3>}
            <br />
            Please enter a reasonable number
            <br />
            <LazyLoadImage src={Jasmine} className="aladdin-jasmine"/>
          </div>
        );
      }
};

export default Warningtext;
