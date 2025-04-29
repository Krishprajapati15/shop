import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
// import { setProducts } from '../../Redux/products/productSlice';
import baseUrl from '../../utils/baseurl';

const ModalUpdate = (props) => {
    // const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({});

    const validateP_name = (p_name) => {
        if (!(String(p_name).trim())) {
            return "Name cannot be empty";
        };
    }
    const validateP_price = (p_price) => {
        if (!(String(p_price).trim())) {
            return "Price cannot be empty";
        };
        if (p_price <= 0) {
            return "Invalid Price";
        };
    }
    const validateP_stock = (p_stock) => {
        if (!(String(p_stock).trim())) {
            return "Stock cannot be empty";
        };
        if (p_stock < 0) {
            return "Invalid Stock";
        };
    }

    const onSubmit = async (data) => {
        // console.log(data);

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ productId: props.updateObj.pid, newdata: data }),
            redirect: 'follow',
            credentials: 'include' //!important
        };

        try {
            const response = await fetch(`${baseUrl}/update`, requestOptions)
            const result = await response.json()
            if (result.status) {
                toast.success("Product added succesfully");
                // to refresh,
                props.fetchProducts();
                // dispatch(setProducts([]));
            } else {
                toast.error("Something went wrong! try again");
                console.log('Error::Modal Add::result', result.message)
            }
        } catch (error) {
            toast.error("Something went wrong! ty again");
            console.log('Error::Modal Add::', error)
        }
        finally {
            // close dialog
            document.getElementById(props.id).close();
        }
    }

    const closeForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // close dialog
        document.getElementById(props.id).close();
    }

    useEffect(() => {
        //https://www.youtube.com/watch?v=lhblLGROK5s
        // https://dev.to/atosh502/set-default-values-in-react-hook-form-5cik
        reset({
            "p_name": props.updateObj.p_name,
            "p_price": props.updateObj.p_price,
            "p_stock": props.updateObj.p_stock
        });
    }, [props.updateObj])

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id={props.id} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{props.title}</h3>
                    <p className="py-4">{props.pid?._id}</p>
                    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="form-control w-full lg:max-w-xs px-2">
                                <div className="label">
                                    <span className="label-text">Product No</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full lg:max-w-xs" disabled value={props.updateObj.index + 1} />
                            </label>
                            <label className="form-control w-full lg:max-w-xs px-2">
                                <div className="label">
                                    <span className="label-text">Product Name</span>
                                </div>
                                <input type="text"
                                    {...register('p_name', { validate: validateP_name })}
                                    name='p_name'
                                    placeholder="Type here" className="input input-bordered w-full lg:max-w-xs" />
                            </label>
                            {errors.p_name && <p className='text-xs text-red-600 ps-2 mt-1'>{errors.p_name.message}</p>}


                            <label className="form-control w-full lg:max-w-xs px-2">
                                <div className="label">
                                    <span className="label-text">Enter Price</span>
                                </div>
                                <input type="number"
                                    {...register('p_price', { validate: validateP_price })}
                                    min={1} name='p_price'
                                    placeholder="Type here" className="input input-bordered w-full lg:max-w-xs" />
                            </label>
                            {errors.p_price && <p className='text-xs text-red-600 ps-2 mt-1'>{errors.p_price.message}</p>}


                            <label className="form-control w-full lg:max-w-xs px-2">
                                <div className="label">
                                    <span className="label-text">Enter Stock</span>
                                </div>
                                <input type="number"
                                    {...register('p_stock', { validate: validateP_stock })}
                                    min={1} name='p_stock'
                                    placeholder="Type here" className="input input-bordered w-full lg:max-w-xs " />
                            </label>
                            {errors.p_stock && <p className='text-xs text-red-600 ps-2 mt-1'>{errors.p_stock.message}</p>}
                        </div>
                        <div className="modal-action">
                            <div>
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn mx-2 px-6 btn-sm btn-primary text-white">Update</button>
                                <button className="btn mx-2 px-6 btn-sm" onClick={closeForm}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </dialog>
            <Toaster />
        </div>
    )
}

export default ModalUpdate