import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Makepayment = () => {
  const { product } = useLocation().state || {}
  const img_url = "http://dumarisper.alwaysdata.net/static/images/"
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  
  const navigate = useNavigate()

  // ✅ Check if user is logged in when component loads
  useEffect(() => {
    const user = localStorage.getItem("user") // or "token" — whatever you store on login
    if (!user) {
      // Redirect to signup, remember they were going to /payment
      navigate("/signup", { state: { redirect: "/payment", product } })
    }
  }, [])

  // function to make payment with Mpesa
  const submit = async (e) => {
    e.preventDefault()
    setMessage("please wait as we process...")
    try {
      const data = new FormData()
      data.append("phone", phone)
      data.append("amount", product.product_cost)
      const response = await axios.post("http://dumarisper.alwaysdata.net/api/mpesa_payment", data)
      setMessage(response.data.message)
    } catch (error) {
      setMessage("")
      setError(error.message)
    }
  }

  // ✅ Don't render payment form if no user (avoids flash before redirect)
  const user = localStorage.getItem("user")
  if (!user) return null

  return (
    <div>
      <h1>𝕄𝕒𝕜𝕖 𝕡𝕒𝕪𝕞𝕖𝕟𝕥-𝕃𝕚𝕡𝕒 𝕟𝕒 𝕄𝕡𝕖𝕤𝕒</h1>
      <img src={img_url + product.product_photo} alt="" />
      <p>{product.product_name}</p>
      <p>{product.product_description}</p>
      <p>{product.product_cost}</p>
      <form onSubmit={submit}>
        {message}
        {error}
        <input
          type="tel"
          placeholder='Enter phone 2547XXXXXXXXX'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /><br /><br />
        <button type='submit' className='btn btn-secondary'>Make payment</button>
      </form>
    </div>
  )
}

export default Makepayment