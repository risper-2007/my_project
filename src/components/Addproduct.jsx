import axios from 'axios'
import React from 'react'
import {useState} from 'react'

const Addproduct = () => {
const[productname,setProductname] = useState("")
const[description,setDescription] = useState ("")
const[cost,setCost] = useState ("")
const[productphoto,setproductphoto] =useState("")
const[loading,setLoading] = useState ("")
const[error,setError] = useState("")
const[success,setSuccess] = useState("")
 
// functions to host data in the database
const submit = async(e) =>{
  e.preventDefault()
  setLoading("please wait as we upload your data")
  try {
    const data = new FormData()
    data.append("product_name", productname)
    data.append("product_description",description)
    data.append("product_cost", cost)
    data.append("product_photo",productphoto)
    // connecting to the flask apis
    const response = await axios.post("http://dumarisper.alwaysdata.net/api/add_product", data)
    // removing the loading message
    setLoading("")
    setSuccess(response.data.message)
    // clearing the inputs
    productname("")
    description("")
    cost("")
    productphoto("")

  } catch (error) {
    setLoading("")
    // updating the error message
    setError(error.message)
  }
}
  return (
    <div className='row mt-4 justify-content-center'>
        <div className='col-md-6 card shadow p-4'>
          <form onSubmit={submit}>
            {loading}
            {success}
            {error}
            <h2>𝔸𝕕𝕕 ℙ𝕣𝕠𝕕𝕦𝕔𝕥</h2>
            <legend>Product Name</legend><br />
            <input type="text"  className='form-control' value={productname} onChange={(e)=> setProductname(e.target.value)} required /><br />
            <legend>Description</legend><br />
            <textarea name="" id=""  className='form-control' value={description} onChange={(e) => setDescription (e.target.value)} required></textarea>
            <legend>Cost (ksh)</legend><br />
            <input type="number" className='form-control'   value={cost}onChange={(e) => setCost(e.target.value.replace("$ ", ""))}required/><br />
            <legend>Product Photo</legend>
            <input type="file" className='form-control'  accept='image/*'  onChange={(e) => setproductphoto(e.target.files[0])} required /><br /><br />
            <button className='btn btn-primary w-100' type='submit'>
              Add product
            </button>

          </form>
        </div>
    </div>
  )
}

export default Addproduct