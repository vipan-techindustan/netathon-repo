import React , {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getSingleWebsiteDetail } from '../api/website'
import DetailPage from '../components/UI/DetailPage'

export default function WebsiteDetails() {
  const { id } = useParams()
  const [webDetailsData,setWebDetailsData] = useState({})
  const [isFetching,setIsFetching] = useState(false)

  const getSingleWebData = async() => {
    setIsFetching(true)
    try {
      const {code,info} = await getSingleWebsiteDetail(id)
      console.log(info)
      if(code===200){
        setWebDetailsData(info)
      }
    } catch (error) {
      console.log(error)
    }
    setIsFetching(false)

  }

  useEffect(()=>{
    getSingleWebData()
  },[])
  return (
    <div>
      <DetailPage {...webDetailsData}  isLoading={isFetching}/>
    </div>
  )
}
