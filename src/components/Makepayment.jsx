import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'


const Makepayment = () => {
  const {product} = useLocation() .state || {}
    const img_url ="http://dumarisper.alwaysdata.net/static/images/"
    const [phone,setPhone] = useState("")
    const[message,setMessage] = useState("")
    const[error,setError] = useState("")
    // function to make payment with Mpesa
    const submit = async (e) => {
    //preventing default behavior of a form
      e.preventDefault ()
    //   set a message
    setMessage("please wait as we process...")
    // connecting axios to the flask endpoints
    try {
        const data = new FormData ()
        // attaching user inputs to the data variable
        data.append ("phone", phone)
        data.append("amount", product.product_cost)
        const response = await axios.post ("http://dumarisper.alwaysdata.net/api/mpesa_payment" ,data)
        // update message
        setMessage("Please complete payment on your phone")
    } catch (error) {
       setMessage("")
       setError(error.message) 
    }
    }
  return (
    <div >
        <h1>𝕄𝕒𝕜𝕖 𝕡𝕒𝕪𝕞𝕖𝕟𝕥-𝕃𝕚𝕡𝕒 𝕟𝕒 𝕄𝕡𝕖𝕤𝕒</h1>
        <img src={img_url + product.product_photo} alt="" />
        <p>{product.product_name}</p>
        <p>{product.product_description}</p>
        <p>{product.product_cost}</p>
        <form onSubmit={submit}>
            {message}
            {error}
            <input type="tel" placeholder='Enter phone 2547XXXXXXXXX' value={phone} onChange={(e) => setPhone (e.target.value)}  /><br /><br />
            <button type='submit' className='btn btn-secondary'>Make payment</button>
        </form>
    </div>
  )
}

export default Makepayment