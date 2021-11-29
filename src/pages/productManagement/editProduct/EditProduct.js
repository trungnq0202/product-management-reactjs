import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../hoc/Layout/Layout";
import { useHistory } from "react-router-dom";
import axios from "../../../axios-request";
import { useParams } from "react-router";

const EditProduct = () => {
    let history = useHistory();
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: "",
        model: "",
        brand: "",
        company: "",
        description: "",
        selling_price: "",
        category: {}
    })

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategories();
        fetchProductById();
    }, []);

    const fetchCategories = async () => {
        const res = await axios.get('/categories/all_without_pagination');
        setCategories(res.data);
    }

    const fetchProductById = async () => {
        const res = await axios.get(`/products/find_by_id/${id}`);
        setProduct(res.data)
    }

    const { name, model, brand, company, description, selling_price, category } = product;

    const onInputChange = e => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const onCategoryChange = e => {
        setProduct({
            ...product,
            category: {
                id: e.target.value
            }
        });
    }

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put("/products/update", product);
        history.push("/product-management");
    }

    return (
        <Layout>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Edit Product</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter product name"
                                name="name"
                                value={name}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control form-control-lg"
                                placeholder="Select category"
                                name="category"
                                onChange={e => onCategoryChange(e)}
                            >
                                <option value="" disabled>Select a category</option>

                                {
                                    categories.map((category, index) => (
                                        category.name === product.category.name ? 
                                        <option key={category.id} value={category.id} selected>{category.name}</option> :
                                        <option key={category.id} value={category.id} >{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter company"
                                name="company"
                                value={company}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter description"
                                name="description"
                                value={description}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter selling price"
                                name="selling_price"
                                value={selling_price}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <button className="btn btn-primary btn-block">Edit Product</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default EditProduct;