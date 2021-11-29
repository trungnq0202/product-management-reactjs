import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../hoc/Layout/Layout";
import { useHistory, useParams } from "react-router-dom";
import axios from "../../../axios-request";

const EditCategory = () => {
    let history = useHistory();
    const { id } = useParams();

    const [category, setCategory] = useState({
        name: ""
    })

    const { name } = category;

    const onInputChange = e => {
        setCategory({ ...category, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`/categories/update`, category);
        history.push("/category-management");
    }

    const fetchCategoryById = async () => {
        const res = await axios.get(`/categories/find_by_id/${id}`);
        setCategory(res.data);
    }

    useEffect(() => {
        fetchCategoryById();
    }, []);

    return (
        <Layout>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Edit Category</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter new category name"
                                name="name"
                                value={name}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <button className="btn btn-primary btn-block">Edit Category</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default EditCategory;