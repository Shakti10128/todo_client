import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";


const Header = () => {
    const [isOpen,setIsOpen] = useState(true);
    const [navbar,setNavbar] = useState();
    const [isNavbar,setIsNavbar] = useState(false);


    const toggleIsMenu = ()=>{
        setIsOpen((prev)=> !prev);
    }

    const manageNavbarHighlight = (nav)=>{
        if(nav === ""){
            setNavbar(undefined);
            setIsNavbar(false);
        }
        else{
            setIsNavbar(true);
            setNavbar(nav);
        }
    }


  return (
    <div className='w-full h-20 flex items-center justify-between bg-violet-500'>
        {/* Todo icon */}
        <div className=''>
            <Link to={"/"}>
                <h1 className='p-2 text-white font-semibold text-2xl cursor-pointer'
                onClick={()=>manageNavbarHighlight("")}>
                    YOUR TODO
                </h1>
            </Link>
        </div>
        <div className='hidden md:flex h-full justify-center w-1/2 items-center text-white font-semibold'>
            <Link to={"/pending-tasks"}>
                <h1 className={`mx-4 p-2 hover:border-2 rounded-md cursor-pointer ${isNavbar && navbar === 'Pending Tasks' ? "border-2 rounded-md" : ""}`} onClick={()=>manageNavbarHighlight("Pending Tasks")}>
                    Pending Tasks
                </h1>
            </Link>
            <Link to={"/in-progress-tasks"}>
                <h1 className={`mx-4 p-2 hover:border-2 rounded-md cursor-pointer ${isNavbar && navbar === 'In-Progress Tasks' ? "border-2 rounded-md" : ""}`} onClick={()=>manageNavbarHighlight("In-Progress Tasks")}>
                    In-Progress Tasks
                </h1>
            </Link>
            <Link to={"/completed-tasks"}>
                <h1 className={`mx-4 p-2 hover:border-2 rounded-md cursor-pointer ${isNavbar && navbar === 'Completed Tasks' ? "border-2 rounded-md" : ""}`} onClick={()=>manageNavbarHighlight("Completed Tasks")}>
                    Completed Tasks
                </h1>
            </Link>
        </div>
        {/* for mobile size */}
        <div className={`md:hidden relative`}>
            {
                isOpen && <AiOutlineMenu onClick={toggleIsMenu}
                className={`p-1 m-2 text-4xl rounded-md border-2 border-white text-white transition-all ease-in-out`}
                />
            }
        </div>
        {
            !isOpen && <div className={`absolute w-full ${isOpen ? "-h-60" : "h-60"} bg-violet-500 top-0 justify-center items-center
            gap-6 text-white z-20`}>
                   <div className={`w-full flex justify-between items-center mt-[14px]`}>
                   <Link to={"/"}>
                        <h1 className='p-2 text-white font-semibold text-2xl cursor-pointer'>
                            YOUR TODO
                        </h1>
                    </Link>

                       <AiOutlineClose onClick={toggleIsMenu}
                       className={`p-1 m-2 text-4xl rounded-md border-2 border-white text-white transition-all ease-in-out`}
                       />
                   </div>
                   <div className='flex flex-col gap-4 justify-center items-center mt-5'>
                        <Link to={"/pending-tasks"}>
                            <h1 className={`hover:border-2 border-white rounded-md p-1 cursor-pointer`}
                            onClick={toggleIsMenu}>
                                Pending Tasks
                            </h1>
                        </Link>
                        <Link to={"/in-progress-tasks"}>
                            <h1 className={`hover:border-2 border-white rounded-md p-1 cursor-pointer`}
                            onClick={toggleIsMenu}>
                                In-Progress Tasks
                            </h1>
                        </Link>
                        <Link to={"/completed-tasks"}>
                            <h1 className={`hover:border-2 border-white rounded-md p-1 cursor-pointer`}
                            onClick={toggleIsMenu}>
                                Completed Tasks
                            </h1>
                        </Link>
                   </div>
           </div>
        }
    </div>
  )
}

export default Header