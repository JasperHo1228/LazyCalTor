import React, { useState } from 'react';

function LanguageBtn({handleLanguageChange}) {
  const [isEnglishBtnClicked, setIsEnglishBtnClicked] = useState(true);
  const [isChineseBtnClicked, setIsChineseBtnClicked] = useState(false);

  const handleEnglishBtn = () => {
    handleLanguageChange('english');
    setIsChineseBtnClicked(false);
    setIsEnglishBtnClicked(true);
  };

  const handleChineseBtn = () => {
    handleLanguageChange('chinese');
    setIsEnglishBtnClicked(false);
    setIsChineseBtnClicked(true);
  };

  const EnglishButton = () => (
    <div className={`languageBtn ${isEnglishBtnClicked ? 'active' : ''}`} onClick={handleEnglishBtn}>
      <h5>English</h5>
    </div>
  );

  const ChineseButton = () => (
    <div className={`languageBtn ${isChineseBtnClicked ? 'active' : ''}`} onClick={handleChineseBtn}>
      <h5>廣東話</h5>
    </div>
  );

  return (
    <div className='flexCenter justifySpaceBetween'>
         <EnglishButton />
         <ChineseButton />
    </div>
  );
}

export default LanguageBtn;
