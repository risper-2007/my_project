import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Addproduct = () => {
  const [productname, setProductname] = useState("")
  const [description, setDescription] = useState("")
  const [cost, setCost] = useState("")
  const [productphoto, setProductphoto] = useState(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [photoName, setPhotoName] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const navigate = useNavigate()

  // 🔐 ADMIN PROTECTION (FIXED & SAFE)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")

      if (!storedUser) {
        navigate("/")
        return
      }

      const user = JSON.parse(storedUser)

      // ✅ handles 1, "1", true
      const admin =
        user?.is_admin === 1 ||
        user?.is_admin === "1" ||
        user?.is_admin === true

      if (!admin) {
        navigate("/")
      } else {
        setIsAdmin(true)
      }
    } catch (err) {
      console.log("Invalid user data")
      navigate("/")
    }
  }, [navigate])

  // 📦 SUBMIT PRODUCT
  const submit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const user = JSON.parse(localStorage.getItem("user"))

      const formData = new FormData()
      formData.append("product_name", productname)
      formData.append("product_description", description)
      formData.append("product_cost", cost)
      formData.append("product_photo", productphoto)

      // send email for backend admin verification
      formData.append("email", user?.email)

      const response = await axios.post(
        "http://dumarisper.alwaysdata.net/api/add_product",
        formData
      )

      setSuccess(response.data.message)

      // reset form
      setProductname("")
      setDescription("")
      setCost("")
      setProductphoto(null)
      setPhotoName("")

    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  // ⛔ prevent UI flash for non-admins
  if (!isAdmin) return null

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>

        <h1 style={{ textAlign: "center" }}>Add Destination</h1>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {success && <p style={{ color: "green" }}>{success}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Name */}
          <div>
            <label>Destination Name</label>
            <input
              type="text"
              value={productname}
              onChange={(e) => setProductname(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Cost */}
          <div>
            <label>Cost</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label>Photo</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                setProductphoto(e.target.files[0])
                setPhotoName(e.target.files[0]?.name || "")
              }}
            />
            {photoName && <small>{photoName}</small>}
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Addproduct