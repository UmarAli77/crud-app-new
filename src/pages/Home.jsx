import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from "../Products";


function HomePage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate("/login")
        }
      }, [navigate])

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await axios.get("https://fakestoreapi.com/products")
                setProducts(response.data)
            } catch(err) {
                console.log(err);
            }
        }
        getProducts()
    }, [])
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete it?")
        if (confirm) {
            try {
                const response = await axios.delete(`https://fakestoreapi.com/products/${id}`)
                console.log(response.data);
                toast.success("Reference deleted", {
                    position: "top-right",
                    autoClose: 5000
                })
            } catch(err) {
                console.log(err);
                toast.error("The information was not deleted", {
                    position: "top-right",
                    autoClose: 5000
                })
            }
        }
    }
  return (
    <div className="flex flex-col justify-start items-center bg-slate-200 w-full h-full">
        <div className="bg-white mt-5">
            <Products />
        </div>
        <div className="flex items-center justify-between">
            <h1 className="text-5xl text-left my-5">Products</h1>
            <button className="w-[100px] h-[40px] border rounded-md bg-green-400 text-white mt-5 ml-[610px]">
                <Link to="/create">Add +</Link>
            </button>
        </div>
        <div className="w-[900px] h-[50px] rounded-md bg-white border shadow-md p-4">
            <table className="table">
                <thead>
                    <tr className="flex items-center justify-beetwen">
                        <th className="mr-[185px]">Image</th>
                        <th className="mr-[160px]">Title</th>
                        <th className="mr-[65px]">Price</th>
                        <th className="mr-[70px]">Category</th>
                        <th className="mr-[90px]">Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            </table>
        </div>
        <tbody className="w-[900px] h-auto mt-1">
            {
                products.map((item) => (
                    <tr className="bg-white p-3 flex items-center justify-between hover:bg-gray-50 hover:my-2" key={item._id}>
                        <td><img width={130} src={item.image} alt={item.title} /></td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>{item.count}</td>
                        <td>
                            <Link className="w-[90px] py-1 flex items-center justify-center rounded-md bg-sky-500 text-white my-2 hover:bg-transparent hover:border-sky-500 hover:border-2 hover:text-black" to={`/read/${item.id}`}>Read</Link>
                            <Link className="w-[90px] py-1 flex items-center justify-center rounded-md bg-green-500 text-white my-2 hover:bg-transparent hover:border-green-500 hover:border-2 hover:text-black" to={`/update/${item.id}`}>Edit</Link>
                            <button onClick={() => handleDelete(item.id)} className="w-[90px] py-1 flex items-center justify-center rounded-md bg-red-600 text-white hover:bg-transparent hover:border-red-600 hover:border-2 hover:text-black">Delete</button>
                        </td>
                    </tr>
                ))
            }
            <ToastContainer />
        </tbody>
    </div>
  )
}

export default HomePage
