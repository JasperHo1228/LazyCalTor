import React from "react";
import '../style/Warningtext.css'
import { LazyLoadImage } from "react-lazy-load-image-component";
const Warningtext = ({ number }) => {
    if (number < 0 || number === 0) {
        return (
          <div  className="warning-text">
            <br />
            Are you joking? Don't mess with me you twat!
            <br />
            咪撚玩野啦屌!
            <br/>
            <LazyLoadImage src="/image/Aladdin.png" className="aladdin"/>
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
            <LazyLoadImage src="/image/Aladdin.png" className="aladdin"/>
          </div>
        );
      } else {
        return (
          <div  className="warning-text">
            <br />
            Please enter a reasonable number
            <br />
            請輸入一個合理數字
            <br/>
            <LazyLoadImage src="/image/Jasmine-Profile1.webp" className="aladdin-jasmine"/>
          </div>
        );
      }
};

export default Warningtext;
