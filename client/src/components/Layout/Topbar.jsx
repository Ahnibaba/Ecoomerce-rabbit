import { FaMeta } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="bg-[#ea2e0e] text-white">
       <div className="container mx-auto flex justify-between items-center py-3 px-4">
         <div className="hidden md:flex items-center space-x-4">
           <a href="" className="hover:text-gray-300">
              <FaMeta className="size-5" />
           </a> 
           <a href="" className="hover:text-gray-300">
              <IoLogoInstagram className="size-5" />
           </a> 
           <a href="" className="hover:text-gray-300">
              <RiTwitterXLine className="size-5" />
           </a> 
         </div>

         <div className="text-sm text-center flex-grow">
            <span>We ship worldwide - Fast and reliable shipping</span>
         </div>
         <div className="text-sm hidden md:block">
            <a href="tel: +1234567890" className="hover:text-gray-300">
                +1 (234) 567-890
            </a>
         </div>
       </div>
    </div>
  )
}

export default Topbar