import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import Card from '../components/UI/Card'
import { TbMoodEmpty } from 'react-icons/tb'
import { getScreenshots } from '../api/screenshots';
import _debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';


export default function Screenshots() {
  const [screenshotSearchKey, setScreenshotSearchKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [websitesData, setWebsitesData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [lastElement, setLastElement] = useState(null)
  const [refresh, setRefresh] = useState(false)


  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPageNum((no) => no + 1);
        }
      })
  );
  const getScreenshotLists = async () => {
    setLoading(true)
    try {
      const { code, info, total } = await getScreenshots(pageNum, 10, screenshotSearchKey)
      console.log("info=>", info)
      // if(code===200){
      setWebsitesData([...websitesData, ...info?.data])
      // }
    } catch (error) {
      console.log(error)
    }
    setRefresh(false)
    setLoading(false)
  }

  const handleChange = (e) => {
    setPageNum(0)
    setRefresh(true)
    setWebsitesData([])
  };


  const debounceFn = useCallback(_debounce(handleChange, 1000), []);

  useEffect(() => {
    if (refresh) {
      getScreenshotLists()

    }
  }, [refresh])


  useEffect(() => {
    if (pageNum <= 10) {
      getScreenshotLists();
    }
  }, [pageNum]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <div>
      <div class='flex justify-end items-end mt-5 pr-5'>
        <div className="w-[400px]">
          <form>
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input onChange={(e) => {
                setScreenshotSearchKey(e.target.value)
                debounceFn(e)
              }} value={screenshotSearchKey} type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Search Screenshots..." required />
            </div>
          </form>

        </div>
      </div>

      {
        websitesData.length > 0 ? <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
          {
            websitesData?.map((website, i) => {
              const { } = website;
              return i === websitesData.length - 1 &&
                !loading &&
                pageNum <= 10 ? (
                <Link to={`/ecommerce/website/${website.website_id}`}>
                  <div
                    key={website.id}
                    ref={setLastElement}
                  >
                    <Card image={website.ss_url} heading={website.name} title={website.title} />
                  </div>
                </Link>
              ) : (
                <Link to={`/ecommerce/website/${website.website_id}`}>
                  <Card key={website.website_id} image={website.ss_url} heading={website.name} title={website.title} />
                </Link>
              );
            })}
          {/* {
            searchData?.map((item => {
              return <Card heading={item.heading} title={item.title} hashtags={item.hastags} />
            }))
          } */}
        </div> : loading ? <div className='h-[400px] w-full flex justify-center items-center'>
          <svg aria-hidden="true" role="status" class="inline mr-3 w-14 h-14 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
          </svg>
        </div> : <div className="flex w-full h-[500px] items-center justify-center">
          <div className="h-12 px-10 rounded-md text-white flex justify-center items-center bg-red-400">
            <TbMoodEmpty size={30} />  <p className="mx-2">No Screenshots found</p>
          </div>
        </div>
      }
    </div>
  )
}
