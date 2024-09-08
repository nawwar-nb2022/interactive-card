import { useState } from 'react'
import './App.css'

import Card_logo from "./assets/icons/Card_logo"
import Template from "./assets/icons/Template"

function App() {
  
  const [inputs , setInputs ] = useState({
    name : "",
    number  :"",
    exp_m : "",
    exp_y : "",
    cvc : ""
  })

  const [errors , setErrors] = useState({
    name : "",
    number  :"",
    exp_m : "",
    exp_y : "",
    cvc : ""
  })

  const [confirmed , setConfirmed] = useState(false)

  const handleChange = (e)=>{
    let name = e.target.name 
    let val = e.target.value 

    setInputs(prev=>({...prev , [name] : val }))
    setErrors(prev=>({...prev , [name] : ""}))

  }




  const handleSubmit = (e)=>{
    e.preventDefault()

    let keys = Object.keys(inputs)
    // check for all field if they are empty
    keys.map(key=>{
      if(inputs[key].length < 1){
        setErrors(prev=>({...prev , [key] : "can't be blank"}))
        return
      }
    })
    let num = inputs.number

    let subs = num.split(" ")
    subs.map(sub=>{
      if( isNaN(+sub) ){
       setErrors(prev=>({...prev , 'number'  : "wrong format , number only"}))
       return
      }
    })

    let time = new Date()
    let year = time.getFullYear()
    let month = time.getMonth()
    
    if(inputs.exp_y < year | ( inputs.exp_m < month & inputs.exp_y == year ) ){
      setErrors(prev=>({...prev , 'exp_y' : "expired card , can;t be used"}))
      setErrors(prev=>({...prev , 'exp_m' : "expired card , can;t be used"}))
      return
    }
    if (inputs.exp_m > 12 ) {
      setErrors(prev=>({...prev , 'exp_m' : "must be number between 1 and 12"}))
      return
    }


    setConfirmed(true)
    console.log(confirmed)

  }

  
  const getZero = (e)=>{
    if (e > 9){
      return e
    }else{
      return "0" + e
    }
  }
  return (
    <main className="mainContainer">
      <div className="gradient-section">
     
        <div className="card-front-section">
          <Card_logo/>
          <div className="content">
            
            <div className="inserted-data">
              {inputs.number ? inputs.number : '0000 0000 0000 0000'}
            </div>
            <div className="card-footer">
              <div className="name">
                {inputs.name ? inputs.name : "JANE APPLESEED"}
              </div>
              <div className="exp">
                {inputs.exp_m ? getZero(inputs.exp_m)  : '00'} / {inputs.exp_y ? inputs.exp_y : "00"}
              </div>
            </div>
          
          </div>
        </div>
     
        <div className="card-back-section">
            <div className="card-center">
              {inputs.cvc ? inputs.cvc : "0000"}
            </div>
        </div>
     
      </div>
      <div className="form-section">
      {!confirmed ? 
     
     <form onSubmit={handleSubmit}>
       <div className="inputContainer">
         <label htmlFor="name"> CARDHOLDER NAME </label>
         {errors.name ? <p className="error"> {errors.name}</p> : <p></p> }
         <input type="text" id="name" name="name" 
           value={inputs.name} onChange={handleChange}
           placeholder="eg. Jane Appleseed"
         />
       </div>
       <div className="inputContainer">
         <label htmlFor="number"> CARD NUMBER </label>
         {errors.number ? <p className="error"> {errors.number}</p> : <p ></p> } 
         <input type="text" id="number" name="number" maxLength="19"
           value={inputs.number} onChange={handleChange}
           placeholder="eg. 12345 5678 9123 0000"
         />
       </div>

       <div className="input-group-container">
         <div>
           <label> EXP. DATE(MM/YY) </label>
           
           <div className="inputContainer">
             {errors.exp_m ? <p className="error" > {errors.exp_m}</p> : <p ></p> }
             <input type="text" name="exp_m"  maxLength="2"
             value={inputs.exp_m} onChange={handleChange} placeholder="MM"/>
           </div>

           <div className="inputContainer">
               {errors.exp_y ? <p className="error"> {errors.exp_y}</p> : <p></p> }
               <input type="text" name="exp_y"  maxLength="4" minLength="4" 
               value={inputs.exp_y} onChange={handleChange} placeholder="YY" />
           </div>
         </div>
         <div className="cvc">
           <label htmlFor="cvc">cvc</label>
           {errors.cvc ? <p className="error"> {errors.cvc}</p> : <p ></p> }
           <input type="text" name="cvc" value={inputs.cvc} onChange={handleChange} 
             placeholder="eg. 123"
           />
         </div>
       </div>

       <div className="btn-container">
           <button type="submit">
             confirm
           </button>
       </div>
     </form>
   
     : 
      <div className="success-container">
            {/* <Template/> */}
            <h2>THANK YOU</h2>
            <h5>We've added your card details</h5>
            <div className="btn-container">
              <button onClick={()=>setConfirmed(false)}>Continue</button>
            </div>
      </div>
    }
      
      </div>
    </main>
  )
}

export default App
