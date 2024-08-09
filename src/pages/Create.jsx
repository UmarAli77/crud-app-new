import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

function CreatePage() {
    const [formData, setFormData] = useState(initialState)
    const [count, setCount] = useState(0)
    const [rate, setRate] = useState(0)
    const navigate = useNavigate();
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate("/login")
        }
    }, [navigate])
    const handleSubmit = async () => {
        try {
            const { title, price, description, category, image } = formData;
            const { rate, count } = formData.rating;
            if(!title || !price || !description || !category || !image || !rate || !count) {
                toast.error("Please fill in the main fields", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: token
            }
            const data = {
                title: title,
                price: price,
                description: description,
                category: category,
                image: image,
                rating: {
                    rate: rate,
                    count: count
                }
            }
            const response = await axios.post("https://fakestoreapi.com/products", data, {
                headers: headers
            })
            if(response.data) {
                navigate("/")
                console.log(response.data);
            }
            setFormData(initialState)
        } catch(err) {
            console.log(err);
        }
    }
  return (
    <div className="flex items-center justify-center w-full h-full">
        <div className="bg-emerald-500 rounded-lg w-[550px] h-auto">
            <h1 className="text-4xl my-5 text-white">Add a Furniture</h1>
            <form className="text-left">
            <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="title">Title</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[80px]" name="title" id="title" value={formData.title} onChange={handleChange} type="text" placeholder="Enter title"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="price">Price</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[75px]" name="price" id="price" value={formData.price} onChange={handleChange} type="text" placeholder="Enter price"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="description">Description</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[18px]" name="description" id="description" value={formData.description} onChange={handleChange} type="text" placeholder="Enter description"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="category">Category</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[39px]" name="category" id="category" value={formData.category} onChange={handleChange} type="text" placeholder="Enter category"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="image">Image</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[64px]" name="image" id="image" value={formData.image} onChange={handleChange} type="text" placeholder="Enter Image"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="rate">Rate</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[78px]" name="rate" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} type="text" placeholder="Enter Rate"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="count">Count</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[64px]" name="count" id="count" value={count} onChange={(e) => setCount(e.target.value)} type="text" placeholder="Enter Count"  />
                </div>
                <div className="flex items-center justify-around my-5">
                    <button onClick={handleSubmit} type="button" className="border-none text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">Submit</button>
                    <button onClick={() => setFormData(initialState)} className="border-none text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-pink-500 to-orange-500 hover:from-teal-400 hover:to-blue-500">Reset</button>
                    <button className="border-none text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-pink-500 to-blue-500 hover:from-teal-400 hover:to-orange-500"><Link to="/">Back</Link></button>
                </div>
                <ToastContainer />
            </form>
        </div>
    </div>
  )
}

export default CreatePage
