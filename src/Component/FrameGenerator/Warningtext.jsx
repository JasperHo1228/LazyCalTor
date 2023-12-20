import React from "react";
import '../../style/Warningtext.css'
import { LazyLoadImage } from "react-lazy-load-image-component";
import Aladdin from "../../Image/Aladdin.png"
import Jasmine from "../../Image/Jasmine-Profile1.webp"

const Warningtext = ({ number, language}) => {
    if (number < 0 || number === 0) {
        return (
          <div className="warning-text">
            <br/>
            {language === 'english' ? <>Are you joking? Don't mess with me!</> : <>你真心有撚病喎Ching</> }
            <br />
            <LazyLoadImage src={Aladdin} className="aladdin"/>
          </div>
        );
      } 
      else if (number === 1) {
        return (
          <div  className="warning-text">
            <br />
              {language === 'english' ? <>Use your calculator!</> : <>你一個人就咪用我啦！</>}
            <br />
            <LazyLoadImage src={Aladdin} className="aladdin"/>
          </div>
        );
      } 
      else if (number >= 200) {
        return (
          <div className="warning-text">
            <br />
          { language === 'english' ? <>How is it that so many people are having dinner together?
            <br />
             No more than 200 please!</> : <>200幾個人你傻咗啊？ 最多200個人呀</>}
            <br/>
            <LazyLoadImage src={Aladdin} className="aladdin" alt="Aladdin" />
          </div>
        );
      }
      else {
        return (
          <div  className="warning-text">
            {language === 'english' ? <>Please enter a reasonable number</> : <>請輸入一個合理數字</>}
            <br />
            <LazyLoadImage src={Jasmine} className="aladdin-jasmine"/>
          </div>
        );
      }
};

export default Warningtext;
