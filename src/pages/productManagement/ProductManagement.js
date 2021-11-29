import React, { useState, useEffect } from "react"
import axios from "../../axios-request";
import Layout from "../../hoc/Layout/Layout";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";

const ProductManagement = (props) => {
    let pageSize = 5;
    const [products, setProducts] = useState([]);
    const [currentPageIndex, setcurrentPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        fetchProducts(1);
    }, [])

    const fetchProducts = async (pageIndex) => {
        const res = await axios.get("/products/all",
            {
                params:
                {
                    'pageIndex': pageIndex,
                    'pageSize': pageSize
                }
            });
        setProducts(res.data.items);
        setcurrentPageIndex(res.data.pageIndex);
        setTotalPages(res.data.totalPage);
    }

    const deleteProduct = async (id, e) => {
        e.preventDefault();
        await axios.delete(`/products/delete/${id}`);
        fetchProducts(1);
    }

    const onChangePageIndex = e => {
        fetchProducts(e.target.value);      
    }

    const moveToPrevPageIndex = e => {
        return currentPageIndex > 1 ? fetchProducts(currentPageIndex - 1) : null;
    }

    const moveToNextPageIndex = e => {
        return currentPageIndex < totalPages ? fetchProducts(currentPageIndex + 1) : null;
    }

    const searchProductsByName = async name => {
        const res = await axios.get('/products/find_by_name', {
            params: {
                'name': name,
                'pageIndex': 1,
                'pageSize': pageSize
            }
        })
        setProducts(res.data.items);
        setcurrentPageIndex(res.data.pageIndex);
        setTotalPages(res.data.totalPage);
    }

    return (
        <Layout>
            <div className="container">
                <h1 className="text-center">Products Management</h1>
                <SearchBar executeSearch={(name) => searchProductsByName(name)}/>
                <div className="py-2">
                    <table class="table border shadow">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Company</th>
                                <th scope="col">Description</th>
                                <th scope="col">Selling price</th>
                                <th scope="col">Action</th>
                                <th class="col-md-2">
                                    <Link className="btn btn-outline-primary" to="/product-management/add">Add Product</Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.name}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.company}</td>
                                    <td>{product.description}</td>
                                    <td>{product.selling_price}</td>
                                    <td>
                                        <Link class="btn btn-outline-primary mr-2"
                                            to={`/product-management/edit/${product.id}`} >Edit</Link>
                                        <button class="btn btn-danger"
                                            onClick={(e) => deleteProduct(product.id, e)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={(e) => { moveToPrevPageIndex(e) }}>&laquo;</button>
                        {
                            Array.from({ length: totalPages }, (_, i) => i + 1).map((page, index) => (
                                currentPageIndex === page ?
                                    <button className="active" key={index + 10000} value={page} onClick={(e) => { onChangePageIndex(e) }}>
                                        {page}
                                    </button>
                                    :
                                    <button value={page} key={index} onClick={(e) => { onChangePageIndex(e) }}>
                                        {page}
                                    </button>
                            ))
                        }
                        <button onClick={(e) => { moveToNextPageIndex(e) }}>&raquo;</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductManagement;