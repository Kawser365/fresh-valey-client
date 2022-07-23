import { useEffect, useState } from "react"

const useProducts = () =>{
    
    const [products, setProducts] = useState([]);

    useEffect( () =>{
        fetch('https://young-ridge-26718.herokuapp.com/allProduct')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);

    return [products, setProducts];
}

export default useProducts;