import React from 'react'
import blankImage from '../../images/no-image-icon.png'



export default function Card({ heading, title, hashtags,image }) {
    return (
        <div className='p-5'>
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img  class="w-full cursor-pointer" loading='lazy' onError={({currentTarget})=>{
                        currentTarget.src=blankImage
                    }} src={image}/>
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">{heading || "-"}</div>
                        <p class="text-gray-700 text-base">
                            {title || "-"}
                        </p>
                    </div>
                    {/* <div class="px-6 pt-4 pb-2">
                        {
                            hashtags.map((hashtag=>{
                                return  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{hashtag}</span>
                            }))
                        }
                    </div> */}
                </div>
        </div>
    )
}
