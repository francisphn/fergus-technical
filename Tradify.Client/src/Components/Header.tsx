import React from "react";
import {signMeOut} from "../Services/firebase";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const navigator = useNavigate()

    return (
        <div className="md:flex md:items-center md:justify-between bg-gradient-to-r from-cyan-400 to-green-400 2xl:px-96 p-6">


            <div className="flex-1 min-w-0">
                <a href="/jobs" className="text-2xl font-bold text-white leading-7 text-white sm:text-3xl sm:truncate">TRADIFY</a>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={event => signMeOut().then(() => navigator("/"))}
                >
                    Sign out
                </button>
                <button
                    onClick={event => navigator('/jobs/create')}
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add a new job
                </button>
            </div>
        </div>
    )
}

export default Header;