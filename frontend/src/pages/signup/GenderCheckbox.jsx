 //actually it should be props here but instead an object inside as parameters. it is not an error for my computer but it is maybe shown as an error for some. so inorder not to show that error we need to add the line "react/prop-types":"off" in the file .eslintrc.cjs ,inside the "rules" nested object after "react-refresh" array
const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className='flex'>
      <div className='form-control'>
        
        <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}> {/* the ternary function in this line just adds the className "selected" or not. it has nothing to do with the logic below  */}
            <span className='label-text'>Male</span>
            <input type="checkbox" className='checkbox border-slate-900'
              checked={selectedGender === "male"}
              onChange={() => {onCheckboxChange("male")}}
            />
        </label>
      </div>

      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}> {/* the ternary function in this line just adds the className "selected" or not. it has nothing to do with the logic below  */}
            <span className='label-text'>Female</span>
            <input type="checkbox" className='checkbox border-slate-900' 
              checked={selectedGender === "female"}
              onChange={() => {onCheckboxChange("female")}}
            />
        </label>
      </div>
    </div>
  )
}

export default GenderCheckbox
/* 
//Starter code
import React from 'react'

const GenderCheckbox = () => {
  return (
    <div className='flex'>
      <div className='form-control'>
        <label className={'label gap-2 cursor-pointer'}>
            <span className='label-text'>Male</span>
            <input type="checkbox" className='checkbox border-slate-900' />
        </label>
      </div>

      <div className='form-control'>
        <label className={'label gap-2 cursor-pointer'}>
            <span className='label-text'>Female</span>
            <input type="checkbox" className='checkbox border-slate-900' />
        </label>
      </div>
    </div>
  )
}

export default GenderCheckbox
 */
