import React, { useState } from 'react'
import PaginatationTable from '../components/PaginatationTable'
import Dailog from '../components/UI/Dailog'

export default function Users() {
    const [showModal, setShowModal] = useState(false);
    const [isDeleteOpen,setIsDeleteOpen] = useState(false)

    return (
        <div className="p-5">
            <h1 className='text-2xl font-bold my-2 flex items-center justify-center'>Users</h1>
            <PaginatationTable deleteHandle={setIsDeleteOpen} editHandler = {setShowModal} />
            <Dailog showModal={showModal} setShowModal={setShowModal}>
                <div >
                    <div className='flex justify-center items-center'>
                        <p className="text-xl font-semibold">Add User</p>
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                        <form className=" rounded px-8 pt-6 pb-8 ">
                            <div className="my-2">
                                <label className="block text-black text-sm font-bold mb-1">
                                    First Name
                                </label>
                                <input className="shadow appearance-none border rounded w-full  py-2 px-1 text-black" />
                            </div>
                            <div className="my-2">
                                <label className="block text-black text-sm font-bold mb-1">
                                    Last Name
                                </label>
                                <input className="shadow w-full appearance-none border rounded  py-2 px-1 text-black" />
                            </div>
                            <div>
                                <label className="block text-black text-sm font-bold mb-1">
                                    Email
                                </label>
                                <input className="shadow w-full appearance-none border rounded  py-2 px-1 text-black" />
                            </div>

                        </form>
                        <div className="items-center justify-center gap-2 mt-3 sm:flex">
                            <button
                                className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                Delete
                            </button>
                            <button
                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Dailog>
            <Dailog showModal={isDeleteOpen} setShowModal={setIsDeleteOpen}>
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="mt-3 sm:flex">
                        <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-red-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="mt-2 text-center sm:ml-4 sm:text-left">
                            <h4 className="text-lg font-medium text-gray-800">
                                Delete User ?
                            </h4>
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore
                                et dolore magna aliqua.
                            </p>
                            <div className="items-center gap-2 mt-3 sm:flex">
                                <button
                                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Delete
                                </button>
                                <button
                                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dailog>
        </div>
    )
}
