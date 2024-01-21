import { useDispatch, useSelector } from 'react-redux';
import './Home.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setLogged } from '../redux/slices/authSlice';
import { verifyTokenApi } from '../api/authService';
import { getProductsApi } from '../api/products';
import { setProducts } from '../redux/slices/productsSlice';
import ProductCard from '../Components/Home/ProductCard';


const Home = () => {

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.items);

    useEffect(() => {
        const checkLogin = async () => {
            if (!token) {
                dispatch(setLogged(false));
                navigate("/login");
            } else {
                try {
                    const response = await verifyTokenApi(token);
                    if (response.status) {
                        dispatch(setLogged(true));
                        navigate("/");
                    }
                } catch (error) {
                    dispatch(setLogged(false));
                    navigate("/login");
                }
            }
        }
        checkLogin();
    }, [token, dispatch, navigate])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProductsApi();
            dispatch(setProducts(response))
        }
        fetchProducts();
    }, [dispatch])

    return (
        <div className="home">
            <h1 className='header'>Products</h1>
            <div className='products'>
                {products?.map((product) => {
                    return <ProductCard key={product.id} product={product} />
                })}
            </div>
        </div>
    )
}


export default Home
