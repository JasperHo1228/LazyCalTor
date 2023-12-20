import React,{useState,useMemo} from 'react';
import NumberOfFrame from './Component/FrameGenerator/NumberOfFrame';
import './App.css';
function App() {
  //choose mode
 const [toggled,setToggle] = useState(true); 
 const memoizedToggled = useMemo(() => toggled, [toggled]);
 const [isEnglishBtnClicked, setIsEnglishBtnClicked] = useState(true);
  const [isChineseBtnClicked, setIsChineseBtnClicked] = useState(false);


 //language version
 const [language, setLanguage] = useState('english'); 
 const languageToggled = useMemo(()=> language, [language])
  const handleToggleBtn = () => {
    setToggle(!toggled);
  }

  // Function to handle language change to English
  const handleEnglishBtn = () => {
    setLanguage('english'); // Set the language state to English
    setIsChineseBtnClicked(false)
    setIsEnglishBtnClicked(true)
  };

  // Function to handle language change to Chinese
  const handleChineseBtn = () => {
    setLanguage('chinese'); // Set the language state to Chinese
    setIsEnglishBtnClicked(false)
    setIsChineseBtnClicked(true)
  };


  const EnglishButton = ()=>{
    return(
      <div className={`languageBtn ${isEnglishBtnClicked ? 'active' : ''}`} onClick={handleEnglishBtn}>
      <h5>English</h5>
    </div>
    )
  }

  const ChineseButton = () => {
    return(
      <div className={`languageBtn ${isChineseBtnClicked ? 'active' : ''}`} onClick={handleChineseBtn}>
      <h5>中文</h5>
    </div>
    )
  }

  return (
    <div className="App">
     <div className={`flexColCenter ${languageToggled ? 'english' : 'chinese'}`}>
      <div className={`app-container ${toggled? 'topic-bg-color-blue': 'topic-bg-color-yellow'}`}>
      <h1 className='padding-bottom'>{language === 'english' ? <>Lazy Ass <br/>Pay me back <br/>Calculator<br/></>: <>懶人追數機</>}
      </h1>      
      <div className='font-weight-700'>{language === 'english' ? <>Choose your language:</>:<>選擇你既語言</>}</div>
      <div className='flexCenter justifySpaceBetween'>
         <EnglishButton />
         <ChineseButton />
      </div>
      <div className={`${memoizedToggled  ? 'toggled' : ''}`}>
        {toggled? <h3>{language=== 'english' ? <>Dine out<br/>Mode</> : <>出面食毛</>}</h3>
                  :<h3> {language=== 'english'? <>Party Mode</> : <>開派對毛</>}</h3>}
        
        <button className={`change-mode-button ${toggled ? 'toggled' : ''}`} onClick={() => handleToggleBtn()}>
        </button>
        </div>
      </div>
        <NumberOfFrame toggled={toggled} language={language}/>
        <div className='copyright'>© 2023 J-Ho All rights reserved whatever...</div>
    </div>
    </div>
  );
}

export default App;
