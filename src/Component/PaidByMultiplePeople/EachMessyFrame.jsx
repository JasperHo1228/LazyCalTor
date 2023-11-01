import React from 'react'
import '../../style/PaidByMutiplePeople/EachMessyFrame.css'
function EachMessyFrame() {
  return (
    <div className='frame-wrapper'>
        <div className='flexColCenter frame-container messy-version'>
          <div className='frame-content'>
           <div className='each-frame-title messy-title-color'>
              Name
            </div>
            <input type='text' className='input-field' placeholder='Name'/> 
          </div>
          </div>
    </div>
  )
}

export default EachMessyFrame