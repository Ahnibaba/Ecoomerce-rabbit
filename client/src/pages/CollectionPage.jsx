import { useEffect, useRef, useState } from "react"
import { FaFilter } from "react-icons/fa6"
import FilterSidebar from "../components/Products/FilterSidebar"
import SortOptions from "../components/Products/SortOptions"
import ProductGrid from "../components/Products/ProductGrid"
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsByFilters } from "../redux/slices/productSlice"


const CollectionPage = () => {
    const dispatch = useDispatch()


    const { collection } = useSearchParams()
    const { products, loading, error } = useSelector((state) => state.products)

    

    const [searchParams] = useSearchParams()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const sidebarRef = useRef()
    const queryaParams = Object.fromEntries([...searchParams])


    useEffect(() => {
      dispatch(fetchProductsByFilters({ collection, ...queryaParams }))
    }, [dispatch, collection, searchParams])
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev)
    }

    const handleClickOutside = (e) => {
        // Close sidebar if clicked outside  
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false)
        }
    }

    useEffect(() => {
        // Add Event listener for clicks
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            // clean event listener
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])




    return (
        <div className="flex flex-col lg:flex-row">
            {/* Mobile Filter button */}
            <button
                className="lg:hidden border p-2 flex justify-center items-center"
                onClick={toggleSidebar}
            >
                <FaFilter className="mr-2" />
                Filter
            </button>

            {/* Filter Sidebar */}
            <div
                ref={sidebarRef}
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
             fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform
             duration-300 lg:static lg:translate-x-0`}
            >
                <FilterSidebar />
            </div>
            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4 inline-block">All Collection</h2>

                {/* Sort Options */}
                <SortOptions />

                {/* Product Grid */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default CollectionPage