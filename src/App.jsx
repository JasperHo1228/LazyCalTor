import React,{useState,useMemo} from 'react';
import NumberOfFrame from './Component/FrameGenerator/NumberOfFrame';
import LanguageBtn from './Component/Button/LanguageBtn';
import './App.css';
function App() {

  //choose mode
  const [toggled,setToggle] = useState(true); 
  const memoizedToggled = useMemo(() => toggled, [toggled]);

  //choose language setup
  const [language, setLanguage] = useState('english'); 
  const languageToggled = useMemo(()=> language, [language])
  const handleToggleBtn = () => {
      setToggle(!toggled);
  }

  return (
    <div className="App">
     <div className={`flexColCenter ${languageToggled ? 'english' : 'chinese'}`}>
      <div className={`app-container ${toggled? 'topic-bg-color-blue': 'topic-bg-color-yellow'}`}>

      <h1 className='padding-bottom'>
        {language === 'english' ? 
             <>Lazy Ass <br/>Pay me back <br/>Calculator<br/></> 
             : 
             <>懶人追數機</>}
      </h1>      

      <div className='font-weight-700'>
              {language === 'english' ? 
                  <>Choose your language:</>
                  :
                  <>選擇你既語言</>}
      </div>

      {/* choose language button */}
      <LanguageBtn handleLanguageChange={setLanguage}/>

      {/* choose mode toggle button */}
      <div className={`${memoizedToggled  ? 'toggled' : ''}`}>
        {toggled ? 
           <h3>
            {language=== 'english' ? <>Dine out<br/>Mode</> : <>出面食毛</>}
           </h3>
           :
           <h3>
            {language=== 'english'? <>Party Mode</> : <>開派對毛</>}
           </h3>
        }
        
        <button className = {`change-mode-button ${toggled ? 'toggled' : ''}`} 
                onClick={() => handleToggleBtn()}>
        </button>

        </div>
       </div>

      {/* generate number of frame */}
      <NumberOfFrame toggled={toggled} language={language}/>

      <div className='copyright'>
        © 2023 J-Ho All rights reserved whatever...
      </div>

    </div>
    </div>
  );
}

export default App;
