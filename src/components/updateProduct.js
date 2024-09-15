import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false)
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])
    const updateProduct = async () => {
        console.warn({ name, price, category, company })
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authoziation: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.warn(result)
        navigate('/')


    }
    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'get',
            headers: {
                authoziation: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company)

    }




    return <div className="addproduct">
        <input type="text" placeholder="product name" className="InputBox"
            value={name} onChange={(e) => setName(e.target.value)} />
        {error && !name && <span className="invalid-input">enter valid name </span>}
        <input type="text" placeholder="product price" className="InputBox"
            value={price} onChange={(e) => setPrice(e.target.value)} />
        {error && !price && <span className="invalid-input">enter valid price </span>}
        <input type="text" placeholder="product category" className="InputBox" value={category}
            onChange={(e) => setCategory(e.target.value)} />
        {error && !category && <span className="invalid-input">enter valid category </span>}
        <input type="text" placeholder="product company" className="InputBox" value={company}
            onChange={(e) => setCompany(e.target.value)} />
        {error && !company && <span className="invalid-input">enter valid company </span>}
        <button type="button" className="appButton" onClick={updateProduct}>Update Product</button>
    </div>
}
export default UpdateProduct;