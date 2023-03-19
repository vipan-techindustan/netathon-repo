import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { deleteEcomQuery, geEcomQueryList, updateEcomQuery } from '../api/website';
import { AiFillEye } from 'react-icons/ai'
import Loading from '../components/UI/Loading';
import { truncateString } from '../utils/helper';
import _debounce from 'lodash/debounce';
import { Link } from 'react-router-dom'
import blankImage from '../images/no-image-icon.png'
import moment from 'moment';
import Dailog from '../components/UI/Dailog'
import { TbTrash } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { CiEdit } from 'react-icons/ci'

export default function EcomQuery() {
    const [loading, setLoading] = useState(true);
    const [ecomQueryData, setEcomQueryData] = useState({
        data: [],
        total: 0,
    });
    const [searchKey, setSearchKey] = useState("")
    const [pageNum, setPageNum] = useState(0);
    const [refresh, setRefresh] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [topicsLists, setTopicLists] = useState([])
    const [queryFieldData, setQueryFieldData] = useState({ title: "", url: "" })
    const [editId,setEditId] = useState("")

    const getWebsitesLists = async () => {
        setLoading(true)
        try {
            const { code, info } = await geEcomQueryList(pageNum, 10, searchKey)
            if (code === 200) {
                setEcomQueryData({ data: info.data, total: info.total })
                setTopicLists(info.topics)
            }
        } catch (error) {
            console.log(error)
        }
        setRefresh(false)
        setLoading(false)
    }

    const handleChange = (e) => {
        setPageNum(0)
        setRefresh(true)
    };

    const addQuery = async () => {
        try {
            const { code, message } = await updateEcomQuery({ ...queryFieldData,id:editId })
            if (code === 200) {
                toast.success(message)
                setRefresh(true)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setEditId("")
        setShowModal(false)

    }

    const deleteQueryHandler = async (id) => {
        const { code, message } = await deleteEcomQuery(id)
        if (code === 200) {
            toast.success(message)
            setRefresh(true)
        }
    }

    const editHandler = (data,id) => {
        setQueryFieldData(data);
        setEditId(id)
        setShowModal(true)
    }

    const handleQueryChange = (e) => {
        console.log(e.target.name)
        setQueryFieldData({ ...queryFieldData, [e.target.name]: e.target.value })
    }

    const debounceFn = useCallback(_debounce(handleChange, 1000), []);

    useEffect(() => {
        if (refresh) {
            getWebsitesLists()

        }
    }, [refresh])


    useEffect(() => {
        getWebsitesLists()
    }, [pageNum])



    const parseData = useMemo(() => {
        return ecomQueryData.data.map((query) => {
            const { created_at, title, url, id } = query;
            return {
                title,
                url,
                created_at,
                actions: <>
                    <div className='flex items-center gap-3'>
                        <TbTrash className=' cursor-pointer' onClick={() => deleteQueryHandler(id)} size={25} />
                        <CiEdit onClick={() => editHandler({ title, url },id)} className=' cursor-pointer' size={25} />
                    </div>
                </>
            }
        })
    }, [ecomQueryData?.data])

    return (
        <div >

            <div class='flex justify-end items-end mt-5 pr-5 mb-5'>

                <div className="w-[400px]">
                    <form>
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input onChange={(e) => {
                                setSearchKey(e.target.value)
                                debounceFn()
                            }} value={searchKey} type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Search Website..." required />
                        </div>
                    </form>
                </div>
            </div>
            <button className='bg-blue-400 p-2 text-white rounded flex ml-5' onClick={()=>setShowModal(true)}>
                Add Search Query
            </button>
            <div className='p-5'>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Topic
                                </th>

                                <th scope="col" class="px-6 py-3">
                                    Search Query
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Created At
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? <Loading /> : parseData?.map((data => {
                                    return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td class="px-6 py-4">
                                            {
                                                data?.title ? <div class="group relative">
                                                    <p >{truncateString(data?.title || "", 20) || "-"}</p>
                                                    <span class="absolute bg-gray-200 top-5 scale-0 rounded  p-2 text-xs text-black group-hover:scale-100">{data?.title}</span>
                                                </div> : "-"
                                            }
                                        </td>
                                        <td class="px-6 py-4">
                                            {data.url}
                                        </td>
                                        <td class="px-6 py-4">
                                            {data?.created_at ? moment(data?.created_at).format('DD-MM-YYYY , hh:mm a') : "-"}
                                        </td>
                                        <td class="px-6 py-4">
                                            {data.actions}
                                        </td>
                                    </tr>
                                }))
                            }
                        </tbody>
                    </table>

                    <div className='flex items-center justify-center my-4'>
                        <button disabled={pageNum === 0} onClick={() => {
                            if (pageNum !== 0) {
                                setPageNum((prev) => prev - 1)
                            }
                        }} className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                            Previous
                        </button>

                        {/* next  */}

                        <a
                            class="relative block rounded-full bg-white mx-4 py-1.5 px-3 text-sm font-medium text-primary-700 transition-all duration-300"
                            href="#!"
                        >
                            {pageNum + 1}
                            <span
                                class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                            >(current)</span
                            >
                        </a>

                        <button disabled={pageNum === Math.ceil(Math.floor(ecomQueryData?.total / 10))} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => {
                            if (pageNum !== ecomQueryData?.total) {
                                setPageNum((prev) => prev + 1)
                            }
                        }}>
                            Next
                            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>

                        </button>

                    </div>
                </div>

            </div>
            <Dailog showModal={showModal} setShowModal={setShowModal}>
                <div >
                    <div className='flex justify-center items-center'>
                        <p className="text-xl font-semibold">{editId ? "Update" : 'Add'} Ecom Query</p>
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                        <form className=" rounded px-8 pt-6 pb-8 ">
                            <div className="my-2">
                                <label className="block text-black text-sm font-bold mb-1">
                                    Query
                                </label>
                                <input onChange={handleQueryChange} name='url' value={queryFieldData.url} className="shadow appearance-none border rounded w-full  py-2 px-1 text-black" />
                            </div>
                            <div className="my-2">
                                <label className="block text-black text-sm font-bold mb-1">
                                    Topic
                                </label>
                                <select onChange={handleQueryChange} value={queryFieldData.title} name="title" id="countries_disabled" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={""}>Select</option>
                                    {
                                        topicsLists?.map((topic => {
                                            return <option value={topic} className='capitalize' >{topic}</option>
                                        }))
                                    }
                                </select>
                                {/* <input className="shadow w-full appearance-none border rounded  py-2 px-1 text-black" /> */}
                            </div>
                            {/* <div>
                                <label className="block text-black text-sm font-bold mb-1">
                                    Email
                                </label>
                                <input className="shadow w-full appearance-none border rounded  py-2 px-1 text-black" />
                            </div> */}

                        </form>
                        <div className="items-center justify-center gap-2 mt-3 sm:flex">
                            <button
                                className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                onClick={() =>
                                    {
                                        setShowModal(false)
                                        setEditId("")
                                        setQueryFieldData({})
                                    }
                                }
                            >
                                Cancel
                            </button>
                            <button
                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                onClick={addQuery}
                            >
                              {editId ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            </Dailog>
        </div>
    )
}
