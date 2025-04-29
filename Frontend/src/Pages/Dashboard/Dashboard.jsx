import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalDelete from '../../Components/Modal/ModalDelete';
import ModalUpdate from '../../Components/Modal/ModalUpdate';

import { useSelector, useDispatch } from 'react-redux'
import { Bars3BottomLeftIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import ModalAdd from '../../Components/Modal/ModalAdd';
import baseUrl from '../../utils/baseurl';
import { setProducts } from '../../Redux/products/productSlice';
import Aside from '../../Components/Aside/Aside';

const Dashboard = () => {

    const isLogin = useSelector((state) => state.login.loginStatus)
    const navigate = useNavigate();

    // get all products from store:
    const products = useSelector((state) => state.product.products);
    const [isFetchFinished, setisFetchFinished] = useState(false);
    const dispatch = useDispatch();

    // fetch products:
    const fetchProducts = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include' //!important
        };

        const response = await fetch(`${baseUrl}/products`, requestOptions);
        const result = await response.json();
        if (result.status) {
            console.log("Product recived succesfully");
            dispatch(setProducts(result.data));
        } else {
            alert("Something went wrong! try again");
            console.log('Error::Dashboard::result', result.message)
        }
        setisFetchFinished(true);
    }


    useEffect(() => {
        // check if login:
        if (!isLogin) {
            navigate("/login")
        } else if (products.length <= 0 && !isFetchFinished) {
            //asyc fetch data and save result to store
            fetchProducts();
        }
    }, [products])


    const showAdd = () => {
        document.getElementById('add_modal').showModal();
    }

    const [updateObj, setupdateObj] = useState({
        pid: "",
        index: "",
        p_name: "",
        p_price: "",
        p_stock: ""
    });

    const showUpdate = (id, i, p_name, p_price, p_stock) => {
        setupdateObj({
            pid: id,
            index: i,
            p_name: p_name,
            p_price: p_price,
            p_stock: p_stock
        })
        document.getElementById('update_modal').showModal();
    }

    const [pid, setpid] = useState(""); //used for selecting current id that will help in delete items
    const showDelete = (id) => {
        setpid(id);
        document.getElementById('delete_modal').showModal();
    }

    // exec only if login:
    return (isLogin &&
        <div className='md:w-[80%] md:mx-auto'>

            {/* main */}
            <div className="drawer lg:drawer-open">
                <input id="sidebar_drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content px-4">
                    <div className="flex items-center justify-between ">
                        {/* Page content here */}
                        <label htmlFor="sidebar_drawer" className="drawer-button lg:hidden">
                            <Bars3BottomLeftIcon className='w-6 h-6' />
                        </label>
                        <h2 className='text-xl'>Products</h2>
                        {/* search bar */}
                        <form action="" className='hidden md:flex items-center w-1/2'>
                            <input type="text" placeholder="Search Procuct" className="input input-bordered rounded-full h-10 lg:w-full" />
                            <button type="submit" className='serch p-2 bg-blue-500 text-white rounded-md ms-2'>
                                <MagnifyingGlassIcon className='w-6 h-6' />
                            </button>
                        </form>
                        {/* search bar */}
                        {/* add btn */}
                        <button onClick={showAdd} className='p-2 bg-primary text-white rounded-md ms-2'>
                            <PlusCircleIcon className='w-6 h-6' />
                        </button>
                    </div>

                    {/* search bar mobile*/}
                    <form action="" className='flex md:hidden items-center w-full mt-4'>
                        <input type="text" placeholder="Search Procuct" className="input input-bordered rounded-full h-10 w-full" />
                        <button type="submit" className='serch p-2 bg-blue-500 text-white rounded-md ms-2'>
                            <MagnifyingGlassIcon className='w-6 h-6' />
                        </button>
                    </form>
                    {/* search bar */}

                    {/* table start */}
                    <div className="overflow-auto max-h-[80vh]">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {products && products.length > 0 && [...products].reverse().map((elem, i, arr) => {
                                    return (
                                        <tr className="hover" key={i}>
                                            <th>{i + 1}</th>
                                            <td>{elem.p_name}</td>
                                            <td>Rs.{elem.p_price}</td>
                                            <td>{elem.p_stock}</td>
                                            <td className='flex'>
                                                <button className='btn btn-primary btn-sm text-white' onClick={() => {
                                                    showUpdate(elem._id, i, elem.p_name, elem.p_price, elem.p_stock)
                                                }}>Update</button>

                                                <button className='btn btn-error btn-sm mx-2' onClick={() => {
                                                    showDelete(elem._id)
                                                }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                    {isFetchFinished && products.length <= 0 && <div className='text-sm px-2 text-center'>No Items Found!<br/>Click on plus to Get Started!</div>}
                    {/* table end */}
                </div>

                <div className="drawer-side md:h-[80vh] h-full">
                    <label htmlFor="sidebar_drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                    <Aside/>
                    
                </div>
            </div>
            {/* main end */}

            {/* modal */}
            <ModalAdd id="add_modal" title="Add Product" fetchProducts={fetchProducts} />
            <ModalDelete id="delete_modal" pid={pid} title="Are u sure to delete?" fetchProducts={fetchProducts}/>
            <ModalUpdate id="update_modal" title="Update Details" updateObj={updateObj} fetchProducts={fetchProducts} />
        </div>
    )
}

export default Dashboard