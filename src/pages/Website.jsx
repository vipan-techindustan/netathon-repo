import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { getAllWebsites } from '../api/website';
import { AiFillEye } from 'react-icons/ai'
import Loading from '../components/UI/Loading';
import { truncateString } from '../utils/helper';
import _debounce from 'lodash/debounce';
import { Link, useSearchParams } from 'react-router-dom'
import blankImage from '../images/no-image-icon.png'

export default function Website() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true);
  const [websitesData, setWebsitesData] = useState({
    data: [],
    total: 0,
  });
  const [searchKey, setSearchKey] = useState("")
  const [pageNum, setPageNum] = useState(0);
  const [refresh, setRefresh] = useState(false)

  const getWebsitesLists = async () => {
    setLoading(true)
    try {
      const { code, info } = await getAllWebsites(pageNum, 10, searchKey)
      if (code === 200) {
        setWebsitesData({ data: info.data, total: info.total })
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

  const debounceFn = useCallback(_debounce(handleChange, 1000), []);

  useEffect(() => {
    if (refresh) {
      getWebsitesLists()

    }
  }, [refresh])


  useEffect(() => {
    getWebsitesLists()
  }, [pageNum])

  useEffect(()=>{
    if(searchParams.get('tag')){
      setSearchKey(searchParams.get('tag') || "")
      setTimeout(()=>{
        setRefresh(true)
      },[100])
    }
  },[])

  const parseData = useMemo(() => {
    return websitesData.data.map((website) => {
      const { crawler_status, desc, meta_img, name, title, url } = website;
      return {
        desc,
        crawler_status,
        desc,
        meta_img,
        name,
        title,
        url,
        actions: <Link to={`/ecommerce/website/${website.id}`}><AiFillEye size={25} /></Link>
      }
    })
  }, [websitesData?.data])

  return (
    <div>
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
              {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </form>

        </div>
      </div>
      <div>
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Meta Image
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Title
                </th>

                <th scope="col" class="px-6 py-3">
                  URL
                </th>
                <th scope="col" class="px-6 py-3">
                  Crawler Status
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
                      <img
                        src={data?.meta_img || blankImage}
                        onError={({ currentTarget }) => {
                          currentTarget.src = blankImage
                        }}
                        alt={data?.meta_img || "not found"}
                        className="rounded h-20 w-20 object-fill" />
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {data.name}
                    </th>
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
                      {
                        data.crawler_status === 0 ? <div class="led-box">
                          <div class="led-red"></div>
                        </div> : <div class="led-box">
                          <div class="led-green"></div>
                        </div>
                      }

                      {/* {data.crawler_status} */}
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

            <button disabled={pageNum === Math.ceil(Math.floor(websitesData?.total / 10))} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => {
              if (pageNum !== websitesData?.total) {
                setPageNum((prev) => prev + 1)
              }
            }}>
              Next
              <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>

            </button>


            {/* <button disabled={true} onClick={() => {
              if (pageNum !== websitesData?.total) {
                setPageNum((prev) => prev + 1)
              }
            }} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
              <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button> */}
          </div>
        </div>

      </div>
    </div>
  )
}
