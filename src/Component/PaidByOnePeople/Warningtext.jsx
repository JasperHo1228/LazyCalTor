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
      } else if (number === 1) {
        return (
          <div  className="warning-text">
            <br />
           Are you out of your mind? <br/>Use your calculator you big brain!
            <br />
            自己用計數機啦
            <br/>
            <LazyLoadImage src={Aladdin} className="aladdin"/>
          </div>
        );
      } else {
        return (
          <div  className="warning-text">
            {toggled ? <h3 className="warning-title-1">Paid By One Person Mode</h3>
            :<h3 className="warning-title-2">Paid By Different Person Mode</h3>}
            <br />
            Please enter a reasonable number
            <br />
            請輸入一個合理數字
            <br/>
            <LazyLoadImage src={Jasmine} className="aladdin-jasmine"/>
          </div>
        );
      }
};

export default Warningtext;
