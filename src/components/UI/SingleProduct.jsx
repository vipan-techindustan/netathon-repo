import React from 'react'
import blankImage from '../../images/no-image-icon.png'
import moment from 'moment'
import { truncateString } from '../../utils/helper'
import ReactStars from 'react-stars'

export default function SingleProduct({ desc, image_url, title, isLoading = false, price, platform, rating, stars }) {
    return (
        <div>
            <div class="flex flex-col justify-center items-center mt-5">
                <div class="relative flex flex-col  rounded-[20px] w-[1000px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                    {
                        isLoading ? <div className='h-[400px] w-full flex justify-center items-center'>
                            <svg aria-hidden="true" role="status" class="inline mr-3 w-14 h-14 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                            </svg>
                        </div> : <>
                            <div className='flex justify-center items-center'>
                                <img src={image_url || blankImage} alt="website_Details" onError={({ currentTarget }) => currentTarget.src = blankImage} className="h-[300px]  object-fill w-[200px]  p-0" />
                            </div>

                            <div className='mt-5'>
                                <div className='flex justify-between mt-2'>
                                    <p className='font-bold'>{truncateString(title, 20) || "-"}</p>
                                    <p className='font-semibold'>{price}</p>
                                </div>
                                <div>
                                    <p className='mt-2'>Platform: {platform === 'amazon' ? <span class="bg-green-100 text-green-800 text-1xl capitalize font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{platform}</span> :  <span class=" capitalize bg-blue-100 text-blue-800 text-1xl font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{platform}</span> }</p>
                                    <p className='mt-2'>Rating: <span className='font-semibold capitalize'> {rating}</span></p>
                                    <div className='flex items-center gap-2'>
                                        <p>Stars:</p>
                                        <ReactStars
                                            count={5}
                                            // onChange={ratingChanged}
                                            size={24}
                                            edit={false}
                                            value={+stars}
                                            half
                                            color2={'#ffd700'} />
                                    </div>

                                </div>
                            </div>


                        </>
                    }

                </div>
            </div>
        </div>
    )
}
