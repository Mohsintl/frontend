import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Product = () => {
    const [products, setProducts] = useState([]);
    // const[search,setSearch] = useState("")
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authoziation: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }
    // console.warn("products", products);

    const deleteProduct = async (id) => {

        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'delete',
            headers: {
                authoziation: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.warn(result);

        if (result) {
            getProducts();
        }
    }
    const searchHandler = async (event) => {
        let key = event.target.value
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authoziation: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }

    }


    return <div className="product-list">
        <h1>product list </h1>
        <input className="searchbar" type="text" placeholder="Search by name or company" onChange={searchHandler} />

        <ul>
            <li>S no </li>
            <li>name</li>
            <li>price</li>
            <li>category</li>
            <li>company</li>
            <li>operations</li>
        </ul>
        {
            products.length ? products.map((item, index) =>
                <ul key={item._id}>
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li><button onClick={() => deleteProduct(item._id)}>delete</button>
                        <Link to={`/update/${item._id}`}>update</Link></li>
                </ul>
            )
                : <h1>No Rsesult found</h1>
        }
    </div>
}
export default Product;