import React from "react";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

import { FaYoutube } from "react-icons/fa";
import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    // <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px] ">
    //     <div className="w-full flex flex-col items-center justify-center m-auto">
    //         <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
                

    //             <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
    //                 <div className="font-bold text-[16px]">Community</div>
    //                 <p className="flex flex-row items-center my-[15px] cursor-pointer">
    //                     <FaYoutube />
    //                     <span className="text-[15px] ml-[6px]">Youtube</span>    
    //                 </p>
    //                 <p className="flex flex-row items-center my-[15px] cursor-pointer">
    //                     <RxGithubLogo />
    //                     <span className="text-[15px] ml-[6px]">Github</span>    
    //                 </p>
    //                 <p className="flex flex-row items-center my-[15px] cursor-pointer">
    //                     <RxDiscordLogo />
    //                     <span className="text-[15px] ml-[6px]">Discord</span>    
    //                 </p>
    //             </div>
    //             <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
    //                 <div className="font-bold text-[16px]">Social Media</div>
    //                 <p className="flex flex-row items-center my-[15px] cursor-pointer">
    //                     <FaYoutube />
    //                     <span className="text-[15px] ml-[6px]">Instagram</span>    
    //                 </p>
    //                 <p className="flex flex-row items-center my-[15px] cursor-pointer">
    //                     <RxGithubLogo />
    //                     <span className="text-[15px] ml-[6px]">Twitter</span>    
    //                 </p>
    //                 <p className="flex flex-row items-center my-[15px] cursor-pointer">
    //                     <RxDiscordLogo />
    //                     <span className="text-[15px] ml-[6px]">Linkedin</span>    
    //                 </p>
    //             </div>
    //             <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
    //                 <div className="font-bold text-[16px]">About</div>
    //                <p className="flex flex-row items-center my-[15px] cursor-pointer">
                     
    //                     <span className="text-[15px] ml-[6px]">Become Sponsor</span>    
    //                 </p>
    //                 <p className="flex flex-row items-center my-[15px] cursor-pointer">
                      
    //                     <span className="text-[15px] ml-[6px]">Learning about me</span>    
    //                 </p>
    //                 <p className="flex flex-row items-center my-[15px] cursor-pointer">
                  
    //                     <span className="text-[15px] ml-[6px]">alstonsoares17@gmail.com</span>    
    //                 </p>
    //             </div>
    //         </div>

    //         <div className="mb-[20px] text-[15px] text-center">
    //             &copy; Alstudd
    //         </div>
    //     </div>
    // </div>


<footer className="bg-transparent rounded-lg shadow m-4 relative z-[20]">
    <div className="w-full max-w-screen-xl mx-auto p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <Sparkles className="text-white"/>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">OptiPick</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="/dashboard" className="hover:underline me-4 md:me-6">Dashboard</a>
                </li>
                <li>
                    <a href="/chatbot" className="hover:underline me-4 md:me-6">Chatbot</a>
                </li>
                <li>
                    <a href="/compare" className="hover:underline me-4 md:me-6">Compare</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-3" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">OptiPick</a>. All Rights Reserved.</span>
    </div>
</footer>


  )
}

export default Footer