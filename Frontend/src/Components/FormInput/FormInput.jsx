import React, { useState } from 'react'
import "./FormInput.css"
function FormInput(props) {
    const {label,onChange,errMessege, ...inputProps}= props;
    const [focused, setFocused] = useState(false)
  return  <>  
        <div className="form-input position-relative">
            {/* <label> {label}</label> */}
            <input className='form-control mt-2' {...inputProps} 
            onChange={onChange} 
            onBlur={()=>setFocused(true)} 
            focused={focused.toString()}
            onFocus={()=>inputProps.name==='re_password'&&setFocused(true)}
            />
            <i className="fa-solid fa-check text-success position-absolute end-0 top-50 translate-middle-y px-3 check"></i>
            <span className='text-danger mt-0 pt-0'>{errMessege}</span>
        </div>

    </>
    
}

export default FormInput