import { useEffect, useState } from "react"
import Hero from "../components/Layout/Hero"
import FeaturedCollection from "../components/Products/FeaturedCollection"
import FeaturedSection from "../components/Products/FeaturedSection"
import GenderCollectionSection from "../components/Products/GenderCollectionSection"
import NewArrivals from "../components/Products/NewArrivals"
import ProductDetails from "../components/Products/ProductDetails"
import ProductGrid from "../components/Products/ProductGrid"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsByFilters } from "../redux/slices/productSlice"
import axios from "axios"


const Home = () => {
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.products)
    const [bestSellerProduct, setBestSellerProduct] = useState(null)

    const API_URL = `${import.meta.env.VITE_BACKEND_URL}`
    const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`

    useEffect(() => {
        dispatch(
            fetchProductsByFilters({
                gender: "Women",
                category: "Bottom Wear",
                limit: 8,
            })
        )

        // Fetch best seller product
        const fetchBestSeller = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/api/products/best-seller`
                )
                console.log("BESTSELLER", response);
                
                setBestSellerProduct(response.data)
            } catch (error) {
                console.error(error);

            }
        }
        fetchBestSeller()
    }, [])

    return (
        <div>
            <Hero />
            <GenderCollectionSection />
            <NewArrivals />

            {/* Best Seller */}
            <h2 className="text-3xl text-center font-bold mb-4">
                Best Seller
            </h2>
            {bestSellerProduct ? (
                <ProductDetails productId={bestSellerProduct._id} />
            ): (
                <p className="text-center">Loading best seller product...</p>
            )}
            <div className="container mx-auto">
                <h2 className="text-3xl text-center font-bold mb-4">
                    Top Wears for Women
                </h2>
                <ProductGrid products={products} loading={loading} error={error} />
            </div>

            <FeaturedCollection />
            <FeaturedSection />
        </div>
    )
}

export default Home