import React from "react"

function Header() {
    return (
        <>
            <div
                className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
                <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Technology</a>
                <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Doctor</a>
                <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Medical</a>
                <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Healthy</a>
                <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Method</a>
                <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Sports</a>
            </div>
            <div className="mt-2 py-10 uppercase text-3xl font-bold bg-[#ebedf0]">Olist Blog</div>
        </>
    )
}

export default Header