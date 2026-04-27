import React from 'react'
import{Link, useNavigate} from 'react-router-dom'
import{useState} from 'react'
import axios from 'axios'

const Signin = () => {
  const [email,setEmail] = useState("")
  const[password,setPassword] = useState("")
   const[showpassword, setShowpassword] = useState(false)
  const [loading,setLoading] = useState("")
  const [error,setError] = useState ("")
  const navigate = useNavigate()

  // the function to host data in the database
  const submit = async(e) =>{
    // prevent the form default behaviour of reloading
    e.preventDefault()
    // updating the loading message
    setLoading("please wait as we log you in")
    // adding user input to the database
    try {
      // storing user inputs into data variable
      const data = new FormData()
      data.append("email", email)
      data.append("password", password)
      // posting user inputs into the database
      const response = await axios.post("http://dumarisper.alwaysdata.net/api/signin", data)
      // updating loading message to empty
      setLoading("")
      // checking if the user exist
      if (response.data.user) {
        // adding the user to the browser local storage
        localStorage.setItem("user", JSON.stringify(response.data.user))
        // redirecting user to the landing page
        navigate("/")

      }
      else{
        // if the login fails 
        setError(response.data.message)
      }
    } catch (error) {
      // updating loading message to empty
      setLoading("")
      // updating error message
      setError(error.response.data.message)
    }
  }
  return (
    <div className="row mt-4 justify-content-center">
      <div className="col-md-6 card shadow p-4">
        <h2>𝕾𝖎𝖌𝖓 𝖎𝖓</h2><br />
        <form onSubmit={submit}>
          {loading}
          {error}

          <input type="email" placeholder='Enter your Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required/><br />

          <div className="input-group mb-3">
          <input 
            type={showpassword ? "text" : "password"} 
            placeholder="Enter your password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            equired 
          />
          <button 
            type="button" 
            className="btn btn-outline-secondary" 
            onClick={() => setShowpassword(!showpassword)}
          >
            {showpassword ? "See" : "Hide"}
          </button>
        </div>
          <button className='btn btn-secondary w-100' type='submit'>
            Sign In
          </button>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
        </div>
    </div>
  )
}

export default Signin