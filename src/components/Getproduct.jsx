import axios from 'axios'
import React, { useEffect } from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Getproduct = () => {
  const [loading,setLoading]= useState("")
  const[error, setError] = useState("")
  const[products,setProducts] = useState([])
  const img_url ="http://dumarisper.alwaysdata.net/static/images/"
  const navigate = useNavigate()

  // the function to fetch data from the database
  const getproducts = async()=>{
    // adding loading message
    setLoading("Please wait as we retrieve products")
    // connecting axios to the flask endpoints
    try {
      // fetching data from the database 
      const response = await axios.get("http://dumarisper.alwaysdata.net/api/get_product_details")
      setLoading("")
      setProducts(response.data)
    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }
  // adding useEffect hook to ensure our website renders only once
  useEffect (() => {
    getproducts()
  },[])

  return (
    <div className='row '>
        <h2>𝕬𝖛𝖆𝖎𝖑𝖆𝖇𝖑𝖊 𝕯𝖊𝖘𝖙𝖎𝖓𝖆𝖙𝖎𝖔𝖓𝖘</h2><br />
        {loading}
        {error}

        {/* mapping all the products to a card */}
        {products.map((product) =>(
          <div className='col-md-3 judtify-content-center mb-4 '> 
          <div className="card shadow bg-light">
            <img src={img_url + product.product_photo } alt="" className='product_img'/>
            <div className="card-body">
              <h5>{product.product_name}</h5>
              <p>{product.product_description}</p>
              <h4 className="text-secondary"> Ksh {product.product_cost} </h4>
              <button className='btn btn-primary mt-2 w-100 ' onClick={()=> navigate('/makepayment',{state: {product}})}>𝔹𝕠𝕠𝕜 ℕ𝕠𝕨</button>
            </div>
            </div>
          
          </div>
        ))}
    </div>
  )
}

export default Getproduct