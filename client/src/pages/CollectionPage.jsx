import { useEffect, useRef, useState } from "react"
import { FaFilter } from "react-icons/fa6"
import FilterSidebar from "../components/Products/FilterSidebar"
import SortOptions from "../components/Products/SortOptions"
import ProductGrid from "../components/Products/ProductGrid"


const CollectionPage = () => {
    const [products, setProducts] = useState()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const sidebarRef = useRef()

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


    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts = [
                {
                    _id: 1,
                    name: "Product 1",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=21",
                            altText: "Product 1 image"
                        }
                    ]
                },
                {
                    _id: 2,
                    name: "Product 2",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=22",
                            altText: "Product 2 image"
                        }
                    ]
                },
                {
                    _id: 3,
                    name: "Product 3",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=23",
                            altText: "Product 3 image"
                        }
                    ]
                },
                {
                    _id: 4,
                    name: "Product 4",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=24",
                            altText: "Product 4 image"
                        }
                    ]
                },
                {
                    _id: 5,
                    name: "Product 5",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=25",
                            altText: "Product 5 image"
                        }
                    ]
                },
                {
                    _id: 6,
                    name: "Product 6",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=26",
                            altText: "Product 6 image"
                        }
                    ]
                },
                {
                    _id: 7,
                    name: "Product 7",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=27",
                            altText: "Product 7 image"
                        }
                    ]
                },
                {
                    _id: 8,
                    name: "Product 8",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=28",
                            altText: "Product 8 image"
                        }
                    ]
                },
            ]
            setProducts(fetchedProducts)
        }, 1000)
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
                <ProductGrid products={products} />
            </div>
        </div>
    )
}

export default CollectionPage