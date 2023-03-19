import React, { useState } from 'react'
import blankImage from '../../images/no-image-icon.png'
import moment from 'moment'

export default function DetailPage({ crawler_status, desc, meta_img, id, tags, title, url, name, isLoading = false, screenshots = [] }) {
    const [selectedImageToShow, setSelectedImageToShow] = useState("")
    return (
        <div>
            <div class="flex flex-col justify-center items-center h-[100vh]">
                <div class="relative flex flex-col items-center rounded-[20px] w-[1000px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                    {
                        isLoading ? <div className='h-[400px] w-full flex justify-center items-center'>
                            <svg aria-hidden="true" role="status" class="inline mr-3 w-14 h-14 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                            </svg>
                        </div> : <>
                            <img src={meta_img || blankImage} alt="website_Details" onError={({ currentTarget }) => currentTarget.src = blankImage} className="h-[300px] object-cover w-full p-0" />
                            <div class="mt-2 mb-8 w-full">
                                <h4 class="px-2 text-xl font-bold text-navy-700 dark:text-white capitalize">
                                    {name}
                                </h4>
                                <p class="mt-2 px-2 text-base text-gray-600">
                                    {desc}
                                </p>
                            </div>
                            <div class="grid grid-cols-2 gap-4 px-2 w-full">
                                <div class="flex flex-col items-start justify-center rounded-2xl shadow-md bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">

                                    <div className='flex justify-between w-full '>
                                        <div>
                                            <p class="text-sm mb-2 text-gray-600 font-semibold">Change Status</p>
                                            <label class="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" checked={crawler_status} class="sr-only peer" />
                                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className='flex flex-col items-center'>
                                            <p class="text-sm text-gray-600 font-semibold">Crawler Status</p>
                                            {
                                                crawler_status === 0 ? <div class="led-box">
                                                    <div class="led-red"></div>
                                                </div> : <div class="led-box">
                                                    <div class="led-green"></div>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                </div>

                                <div class="flex flex-wrap flex-col justify-center rounded-2xl bg-white shadow-md bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                    <p class="text-sm text-gray-600 font-semibold mb-2">URL</p>
                                    <div className='flex flex-wrap justify-between items-center'>
                                        <p class="text-base font-medium text-navy-700 dark:text-white">
                                            {url}
                                        </p>
                                        <a href={url} target="_blank">
                                            <button class="text-white bg-blue-400 p-2 rounded text-base font-medium text-navy-700 dark:text-white">
                                                Visit Site
                                            </button>
                                        </a>

                                    </div>

                                </div>
                                {
                                    tags?.length > 0 && <div class="flex flex-col justify-center rounded-2xl bg-white shadow-md bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                        <p class="text-sm text-gray-600">Hashtags</p>
                                        <div class="px-6 pt-4 pb-2">
                                            {
                                                tags.map((hashtag => {
                                                    return <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{hashtag?.name?.trim()}</span>
                                                }))
                                            }
                                        </div>
                                    </div>
                                }
                            </div>

                        </>
                    }
                    <div className='my-10 w-full ml-4'>
                        <p className='text-2xl font-semibold my-3'> Screenshots History</p>
                        <div className='grid-cols-1 grid lg:grid-cols-4 md:grid-cols-2 gap-5'>
                            {
                                screenshots.map((screenshot => {
                                    return <div className=' cursor-pointer'>
                                        <img onClick={() => setSelectedImageToShow(screenshot?.ss_url)} src={screenshot?.ss_url} className="w-[200px] h-[200px]" />
                                        <div>
                                            <p className='text-red-400 mt-3'>Created on:</p>
                                            <p className='text-black'>{moment(screenshot.updated_at)?.format('DD-MM-YYYY , hh:mm a')}</p>
                                        </div>
                                    </div>
                                }))
                            }
                        </div>
                    </div>
                    {
                        selectedImageToShow && <div id="modal"
                            class=" fixed top-0 left-0 z-[200] w-screen h-screen bg-black/70 flex justify-center items-center">

                            <a class="fixed z-90 top-6 right-8 text-white text-5xl font-bold" href="javascript:void(0)"
                                onClick={() => setSelectedImageToShow("")}>&times;</a>
                            <img src={selectedImageToShow} id="modal-img" class="max-w-[800px] max-h-[600px] object-cover" />
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
