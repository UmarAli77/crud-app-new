import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

const initialState = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
        rate: 0,
        count: 0
    }
}

function UpdatePage() {
    const [form, setForm] = useState(initialState);
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        async function getIdProducts() {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setForm(response.data)
            }catch(err) {
                console.log(err);
            }
        }
        getIdProducts()
    }, [id])
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value })
    }
    const handleReset = () => {
        setForm(initialState)
    }
    const handleSubmit = () => {
        async function getProductsId() {
            try {
                const response = await axios.put(`https://fakestoreapi.com/products/${id}`, form);
                navigate("/")
                console.log(response);
            } catch(err) {
                console.log(err);
            }
        }
        getProductsId()
    }
  return (
    <div className="flex items-center justify-center w-full h-full">
        <div className="bg-emerald-500 rounded-lg w-[550px] h-auto">
            <h1 className="text-4xl my-5 text-white">Update a Furniture</h1>
            <form className="text-left">
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="title">Title</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[80px]" name="title" id="title" value={form.title} onChange={handleChange} type="text" placeholder="Enter title"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="price">Price</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[75px]" name="price" id="price" value={form.price} onChange={handleChange} type="text" placeholder="Enter price"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="description">Description</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[18px]" name="description" id="description" value={form.description} onChange={handleChange} type="text" placeholder="Enter description"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="category">Category</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[39px]" name="category" id="category" value={form.category} onChange={handleChange} type="text" placeholder="Enter category"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="image">Image</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[64px]" name="image" id="image" value={form.image} onChange={handleChange} type="text" placeholder="Enter Image"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="rate">Rate</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[78px]" name="rate" id="rate" value={form.rating.rate} onChange={handleChange} type="text" placeholder="Enter Rate"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="count">Count</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[64px]" name="count" id="count" value={form.rating.count} onChange={handleChange} type="text" placeholder="Enter Count"  />
                </div>
                <div className="flex items-center justify-around my-5">
                    <button onClick={handleSubmit} type="button" className="border-none text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">Submit</button>
                    <button onClick={handleReset} className="border-none text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-pink-500 to-orange-500 hover:from-teal-400 hover:to-blue-500">Reset</button>
                    <button className="border-none text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-pink-500 to-blue-500 hover:from-teal-400 hover:to-orange-500"><Link to="/">Back</Link></button>
                </div>
                <ToastContainer />
            </form>
        </div>
    </div>
  )
}

export default UpdatePage
