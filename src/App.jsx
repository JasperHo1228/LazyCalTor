import React,{useState,useMemo} from 'react';
import NumberOfFrame from './Component/FrameGenerator/NumberOfFrame';
import './App.css';
function App() {
  const [toggled,setToggle] = useState(true);

 const memoizedToggled = useMemo(() => toggled, [toggled]);

  const handleToggleBtn = () => {
    setToggle(!toggled);
  }
  return (
    <div className="App">
      <h1>Lazy Ass Pay me back Calculator<br/>
      </h1>
      <div className='mode-wrapper'>
        <div className={`flexColCenter mode-container ${memoizedToggled  ? 'toggled' : ''}`}>
        {toggled? <h3>Dine out Mode</h3>:<h3>Party Mode</h3>}
        <button className={`change-mode-button ${toggled ? 'toggled' : ''}`} onClick={() => handleToggleBtn()}>
        </button>
        </div>
      </div>
        <NumberOfFrame toggled={toggled}/>
        <div className='copyright'>© 2023 J-Ho All rights reserved whatever...</div>
    </div>
  );
}

export default App;
