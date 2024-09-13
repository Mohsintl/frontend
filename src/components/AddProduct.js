import { useState } from "react";

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false)
    const addProduct = async () => {
        // console.warn({ name, price, category, company })
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, userId, company }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json();
        console.warn(result);

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
        <button type="button" className="appButton" onClick={addProduct}>add Product</button>
    </div>
}
export default AddProduct;