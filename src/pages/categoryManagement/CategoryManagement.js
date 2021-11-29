import React, { useState, useEffect } from "react"
import axios from "../../axios-request";
import Layout from "../../hoc/Layout/Layout";
import { Link } from "react-router-dom";
import './categoryManagement.css';

const CategoryManagement = (props) => {
    let pageSize = 5;
    const [categories, setCategories] = useState([]);
    const [currentPageIndex, setcurrentPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchCategories(1);
    }, [])

    const fetchCategories = async (pageIndex) => {
        const res = await axios.get("/categories/all",
            {
                params:
                {
                    'pageIndex': pageIndex,
                    'pageSize': pageSize
                }
            });
        setCategories(res.data.items);
        setcurrentPageIndex(res.data.pageIndex);
        setTotalPages(res.data.totalPage);
    }

    const deleteCategory = async (id, e) => {
        e.preventDefault();
        await axios.delete(`/categories/delete/${id}`);
        fetchCategories(1);
    }

    const onChangePageIndex = e => {
        fetchCategories(e.target.value);      
    }

    const moveToPrevPageIndex = e => {
        return currentPageIndex > 1 ? fetchCategories(currentPageIndex - 1) : null;
    }

    const moveToNextPageIndex = e => {
        return currentPageIndex < totalPages ? fetchCategories(currentPageIndex + 1) : null;
    }

    return (
        <Layout>
            <div className="container">
                <h1 className="text-center">Category Management</h1>
                <div className="py-2">
                    <table class="table border shadow">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col" class="col-md-2">#</th>
                                <th scope="col" class="col-md-4">Name</th>
                                <th scope="col" class="col-md-4">Action</th>
                                <th class="col-md-2">
                                    <Link className="btn btn-outline-primary" to="/category-management/add">Add category</Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{category.name}</td>
                                    <td>
                                        <Link class="btn btn-outline-primary mr-2"
                                            to={`/category-management/edit/${category.id}`} >Edit</Link>
                                        <button class="btn btn-danger"
                                            onClick={(e) => deleteCategory(category.id, e)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={(e) => {moveToPrevPageIndex(e)}}>&laquo;</button>
                        {
                            Array.from({length: totalPages}, (_, i) => i + 1).map((page, index)=> (
                                currentPageIndex === page ? 
                                <button className="active" key={index} value={page} onClick={(e) => {onChangePageIndex(e)}}>
                                    {page}
                                </button>
                                :
                                <button value={page} key={index} onClick={(e) => {onChangePageIndex(e)}}>
                                    {page}
                                </button>
                            ))
                        }
                        <button onClick={(e) => {moveToNextPageIndex(e)}}>&raquo;</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CategoryManagement;