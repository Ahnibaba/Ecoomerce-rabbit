import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef()
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
 

  const [newArrivals, setNewArrivals] = useState([])

  const API_URL =  `${import.meta.env.VITE_BACKEND_URL}`
  const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`



  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/products/new-arrivals`
        )
        setNewArrivals(response.data)
      } catch (error) {
        console.error(error);
        
      }
    }
    fetchNewArrivals()
  }, [])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if(!isDragging) return
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - startX
    scrollRef.current.scrollLeft = scrollLeft - walk
  }
  const handleMouseUpOrLeave = (e) => {
    setIsDragging(false)
  }

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" })
  }

  //Update Scroll Buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current
    console.dir({
      scrollLeft: container.scrollLeft,
      clientWidth: container.clientWidth,
      containerScrollWidth: container.scrollWidth,
      offsetLeft: scrollRef.current.offsetLeft
    });

    if (container) {
      const leftScroll = container.scrollLeft
      console.log((leftScroll + container.clientWidth));
      
      const rightScrollable = container.scrollWidth > (leftScroll + container.clientWidth) || leftScroll === 0 && container.scrollWidth === (leftScroll + container.clientWidth)

      setCanScrollLeft(leftScroll > 0)
      setCanScrollRight(rightScrollable)

    }



  }

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      container.addEventListener("scroll", updateScrollButtons)
      updateScrollButtons()
      return () => container.removeEventListener("scroll", updateScrollButtons)
    }
  }, [newArrivals])
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">
          Explore New Arrivals
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runaway, freshly added to
          your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 sm:bottom-[-30px] bottom-[-37px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-1 sm:p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-1 sm:p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
           <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
         ref={scrollRef}
         className={`container mx-auto overflow-x-scroll flex space-x-6 relative
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUpOrLeave}
         onMouseLeave={handleMouseUpOrLeave}
        >
        {newArrivals.map((product) => (
          <div key={product?._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
            <img
              src={product?.images[0]?.url}
              alt={product?.images[0]?.altText || product.name}
              className="w-full h-[100%] object-cover rounded-lg"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product?._id}`} className="block">
                <h4 className="font-medium">{product?.name}</h4>
                <p className="my-1">${product?.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewArrivals