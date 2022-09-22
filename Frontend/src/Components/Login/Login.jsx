import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({setCurrentUser}) {
  const baseURL = 'http://localhost:5000/api/v1/users'


  const [isLoading, setIsLoading] = useState(false)
  const navigate=useNavigate()
  const [backEndERR, setBackEndERR] = useState(false) 

  const [values, setValues] = useState({
    email:'',
    password:''
  })

  const inputs = [

    {
      id:1,
      name:'email',
      type:"email",
      placeholder:"Email",
      errMessege:"Email doesn't valid",
      label:"Email",
      required:true,
      // pattern:""
    },
    {
      id:2,
      name:'password',
      type:"password",
      placeholder:"Password",
      label:"Password",
      required:true,
    }
  ]


  async function handleSumbit(e){
    e.preventDefault()
    setIsLoading(true)
    let {data} = await axios.post(`${baseURL}/signin`,values)
    const user = data.result[0]
    if(data.message ==="done"){
      localStorage.setItem("currentUser",JSON.stringify(user))
      setCurrentUser(user)
      // decodeToken()
      navigate('/')

    }else{
      setBackEndERR(data.message)
      setIsLoading(false);
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
      :'Login'
      }</button>
      

    </form> 
  </>
  )
}

export default Login