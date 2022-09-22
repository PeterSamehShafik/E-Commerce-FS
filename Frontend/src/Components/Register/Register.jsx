import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const baseURL = 'http://localhost:5000/api/v1/users'
  const [isLoading, setIsLoading] = useState(false)
  const navigate=useNavigate()
  const [backEndERR, setBackEndERR] = useState(false) 

  const [values, setValues] = useState({
    firstName:'',
    lastName:'',
    age:'',
    email:'',
    password:'',
  })

  const inputs = [
    {
      id:1,
      name:'firstName',
      type:"text",
      placeholder:"First Name",
      errMessege:"Name must be 3-16 characters and shouldn't include any special charecter ",
      label:"First Name",
      required:true,
      pattern:'^[A-Za-z][A-Za-z0-9_]{1,16}$'

    },
    {
      id:2,
      name:'lastName',
      type:"text",
      placeholder:"Last Name",
      errMessege:"Name must be 3-16 characters and shouldn't include any special charecter ",
      label:"Last Name",
      required:true,
      pattern:'^[A-Za-z][A-Za-z0-9_]{1,16}$'
    },
    {
      id:3,
      name:'email',
      type:"email",
      placeholder:"Email",
      errMessege:"Email doesn't valid",
      label:"Email",
      required:true,
      // pattern:""
    },
    {
      id:4,
      name:'age',
      type:"text",
      placeholder:"Age",
      errMessege:'Age must be number',
      label:"Age",
      required:true,
      pattern:'^[0-9]+$'
    },
    {
      id:5,
      name:'password',
      type:"password",
      placeholder:"Password",
      errMessege:"password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters",
      label:"Password",
      required:true,
      pattern:'^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$'
    },
    {
      id:6,
      name:'re_password',
      type:"password",
      placeholder:"Re-Enter Password",
      errMessege:"Password doesn't match!",
      label:"Re-Enter Password",
      required:true,
      pattern: values.password
    }
  ]

  async function handleSumbit(e){
    e.preventDefault()
    setIsLoading(true)
    let {data} = await axios.post(`${baseURL}/signup`,values)
			console.log(data);
			if(await data.message ==="done"){
				navigate('/login')
        setIsLoading(false)
			}else{
				setBackEndERR( data.message)
        setIsLoading(false)
			}
    
  }
  function handleTyping(e){
    setValues({...values,[e.target.name]:e.target.value})
  }
  // console.log(values)
  
  return (
  <>  
    <form onSubmit={handleSumbit}>

      {backEndERR&&<div className='alert alert-danger'>{backEndERR}</div>}
      {inputs.map( (input)=>
        <FormInput key={input.id} {...input} value={values[input.name]} onChange={handleTyping}/>
      )}
      
      <button className='btn btn-primary mt-3' type='sumbit'> {
      isLoading?<div className="lds-dual-ring"></div>
      :'Sign Up'
      }</button>
      

    </form> 
  </>
  )
}

export default Register