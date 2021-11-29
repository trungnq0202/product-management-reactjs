import React from "react";
import { useState } from "react";
import Layout from "../../../hoc/Layout/Layout";
import { useHistory } from "react-router-dom";
import axios from "../../../axios-request";

const AddCategory = () => {
    let history = useHistory();

    const [category, setCategory] = useState({
        name: ""
    })

    const { name } = category;

    const onInputChange = e => {
        setCategory({ ...category, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("/categories/add", category);
        history.push("/category-management");
    }

    return (
        <Layout>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Add A Category</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter category name"
                                name="name"
                                value={name}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <button className="btn btn-primary btn-block">Add Category</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory;