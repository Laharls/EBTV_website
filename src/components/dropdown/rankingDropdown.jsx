import { useEffect, useState } from 'react';
import Link from "next/link";

const RankingDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    function handleClickOutside(event) {
        if (event.target.closest(".dropdown") === null) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="dropdown relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-md focus:outline-none focus:bg-gray-800 relative z-10"
            >
                Division
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-1/2 transform translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                    <div className="py-1">
                        {[...Array(12)].map((_, index) => (
                            <Link key={index} href={`/sp3/s3/division${index + 1}`} className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600">{`D${index + 1}`}</Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default RankingDropdown;