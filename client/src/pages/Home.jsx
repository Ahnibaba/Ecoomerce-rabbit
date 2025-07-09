import Hero from "../components/Layout/Hero"
import FeaturedCollection from "../components/Products/FeaturedCollection"
import FeaturedSection from "../components/Products/FeaturedSection"
import GenderCollectionSection from "../components/Products/GenderCollectionSection"
import NewArrivals from "../components/Products/NewArrivals"
import ProductDetails from "../components/Products/ProductDetails"
import ProductGrid from "../components/Products/ProductGrid"


const Home = () => {

  const placeholderProducts = [
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
  return (
    <div>
        <Hero />
        <GenderCollectionSection />
        <NewArrivals />

        {/* Best Seller */}
        <h2 className="text-3xl text-center font-bold mb-4">
           Best Seller
        </h2>
        <ProductDetails />

        <div className="container mx-auto">
           <h2 className="text-3xl text-center font-bold mb-4">
             Top Wears for Women
           </h2>
           <ProductGrid products={placeholderProducts} />
        </div>

        <FeaturedCollection />
        <FeaturedSection />
    </div>
  )
}

export default Home