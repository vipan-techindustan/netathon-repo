import React from 'react'

export default function Loading() {
    return (
        <>
            {
                [1, 2, 3, 4, 5, 6, 6, 7].map((item => {
                    return <tr>
                        <td>
                            <div role="status" class="max-w-sm animate-pulse">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 m-4"></div>
                            </div>
                        </td>
                        <td>
                            <div role="status" class="max-w-sm animate-pulse">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 m-4"></div>
                            </div>
                        </td>
                        <td>
                            <div role="status" class="max-w-sm animate-pulse">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 m-4"></div>
                            </div>
                        </td>
                        <td>
                            <div role="status" class="max-w-sm animate-pulse">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 m-4"></div>
                            </div>
                        </td>
                        <td>
                            <div role="status" class="max-w-sm animate-pulse">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 m-4"></div>
                            </div>
                        </td>
                        <td>
                            <div role="status" class="max-w-sm animate-pulse">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 m-4"></div>
                            </div>
                        </td>
                    </tr>
                }))
            }
        </>
    )
}


{/* <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div> */}