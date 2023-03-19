import React, { useEffect, useMemo, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getTopFiveWebsite, getTotalWebsitesCount } from '../api/dashboard';

// import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
// import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
// import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';

function Dashboard() {
  const [dashboardData,setDashboardData] = useState({})
  const [topFiveWebData,setTopFiveWebData] = useState([])

  const fetchDashboardData = async()=>{
    try {
      const {code,info} = await getTotalWebsitesCount()
      if(code===200){
      // console.log("res==>",res)
        setDashboardData(info)
      }
    } catch (error) {
      console.log("error==>",error)
    }
  }

  const fetchTopFiveWebsite = async()=>{
    try {
      const {code,info} = await getTopFiveWebsite()
      if(code===200){
      console.log("res==>",info)
        setTopFiveWebData(info.data)
      }
    } catch (error) {
      console.log("error==>",error)
    }
  }

  const parseData = useMemo(()=>{
    return topFiveWebData?.map((website) => {
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
  },[topFiveWebData])

  useEffect(()=>{
    fetchDashboardData()
    fetchTopFiveWebsite()
  },[])
  return (
      // <Layout>
     <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Welcome banner */}
      {/* <WelcomeBanner /> */}

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-end sm:items-center mb-8">

        {/* Left: Avatars */}
        {/* <DashboardAvatars /> */}

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          {/* <FilterButton /> */}
          {/* Datepicker built with flatpickr */}
          {/* <Datepicker /> */}
          {/* Add view button */}
          {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
              <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Add view</span>
          </button>                 */}
        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">

        {/* Line chart (Acme Plus) */}
        <DashboardCard01 data={dashboardData?.data || []} chartsData ={dashboardData?.charts || {}} />
        {/* Line chart (Acme Advanced) */}
        <DashboardCard02 data={dashboardData?.data || []} chartsData ={dashboardData?.charts || {}}  />
        {/* Line chart (Acme Professional) */}
        <DashboardCard03 data={dashboardData?.data || []} chartsData ={dashboardData?.charts || {}}  />
        {/* Bar chart (Direct vs Indirect) */}
        {/* <DashboardCard04 data={dashboardData?.data || []} chartsData ={dashboardData?.charts || {}}  /> */}

         {/* Table (Top Channels) */}
         <DashboardCard07 data={parseData} />




         
        {/* Line chart (Real Time Value) */}
        {/* <DashboardCard05 /> */}
        {/* Doughnut chart (Top Countries) */}
        {/* <DashboardCard06 /> */}
       
        {/* Line chart (Sales Over Time) */}
        {/* <DashboardCard08 /> */}
        {/* Stacked bar chart (Sales VS Refunds) */}
        {/* <DashboardCard09 /> */}
        {/* Card (Customers) */}
        {/* <DashboardCard10 /> */}
        {/* Card (Reasons for Refunds) */}
        {/* <DashboardCard11 /> */}
        {/* Card (Recent Activity) */}
        {/* <DashboardCard12 /> */}
        {/* Card (Income/Expenses) */}
        {/* <DashboardCard13 /> */}
        
      </div>

    </div>
  // </Layout>
  );
}

export default Dashboard;