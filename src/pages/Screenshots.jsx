import React, { useState, useMemo, useEffect, useRef } from 'react'
import Card from '../components/UI/Card'
import { TbMoodEmpty } from 'react-icons/tb'
import { getAllWebsites } from '../api/website';

export default function Screenshots() {
  const [searchHashtagKey, setSearchHashtagKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [websitesData, setWebsitesData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [lastElement, setLastElement] = useState(null)

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPageNum((no) => no + 1);
        }
      })
  );
  const getWebsitesLists = async () => {
    setLoading(true)
    try {
      const {code,info,total} = await getAllWebsites(pageNum)
      if(code===200){
        setWebsitesData([...websitesData,...info?.data])
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (pageNum <= 10) {
      getWebsitesLists();
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

  let data = [
    {
      heading: "The Coldest Sunset",
      title: "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      hastags: ["photography", "travel", "winter"]
    },
    {
      heading: "The Coldest Sunset",
      title: "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      hastags: ["snapchat", "area", "summer"]
    },
    {
      heading: "The Coldest Sunset",
      title: "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      hastags: ["movie", "mountain", "spring"]
    },
    {
      heading: "The Coldest Sunset",
      title: "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      hastags: ["night", "day", "winter"]
    },
    {
      heading: "The Coldest Sunset",
      title: "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      hastags: ["photography", "travel", "winter"]
    }
  ]



  // useEffect(() => {
  //   getWebsitesLists()
  // }, [])

  const searchData = useMemo(() => {
    if (!searchHashtagKey) return data;
    return data.filter((item => item.hastags.some(hashtag => hashtag.includes(searchHashtagKey))))
  }, [searchHashtagKey])

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
              <input onChange={(e) => setSearchHashtagKey(e.target.value)} value={searchHashtagKey} type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Search Hashtags..." required />
              {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </form>

        </div>
      </div>

      {
        websitesData.length > 0 ? <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
          {
            websitesData?.map((website, i) => {
              const {} = website;
              return i === websitesData.length - 1 &&
                !loading &&
                pageNum <= 10 ? (
                <div
                  key={website.id}
                  ref={setLastElement}
                >
                  <Card image={website.meta_img} heading={website.name} title={website.title} hashtags={website.hastags} />
                </div>
              ) : (
                <Card  key={website.id} image={website.meta_img} heading={website.name} title={website.title} hashtags={website.hastags} />
              );
            })}
          {/* {
            searchData?.map((item => {
              return <Card heading={item.heading} title={item.title} hashtags={item.hastags} />
            }))
          } */}
        </div> : <div className="flex w-full h-[500px] items-center justify-center">
          <div className="h-12 px-10 rounded-md text-white flex justify-center items-center bg-red-400">
            <TbMoodEmpty size={30} />  <p className="mx-2">No Websites found</p>
          </div>
        </div>
      }




    </div>
  )
}
