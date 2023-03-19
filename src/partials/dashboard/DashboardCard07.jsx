import React from 'react';
import { TbMoodEmpty } from 'react-icons/tb';
import { truncateString } from '../../utils/helper';
import BlankImage from '../../images/no-image-icon.png'
import moment from 'moment';

function DashboardCard07({ data }) {
  console.log("data=>", data)
  return (

    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Top Websites</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          {
            data?.length == 0 ? <div className="flex w-full h-[400px] items-center justify-center">
              <div className="h-12 px-10 rounded-md text-white flex justify-center items-center bg-red-400">
                <TbMoodEmpty size={30} />  <p className="mx-2">No Websites found</p>
              </div>
            </div> : <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Source</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Title</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Created On</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Crawler Status</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Sales</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}

              <tbody className="text-sm font-medium divide-y divide-slate-100">

                {
                  data?.map((item => {
                    return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <img src={item?.meta_img || BlankImage} onError={({ currentTarget }) => {
                            currentTarget.src = BlankImage
                          }}
                            className="shrink-0 mr-2 sm:mr-3 rounded-full h-12 w-12" />

                          <div className="text-slate-800">  {item.name}</div>
                        </div>
                      </th>
                      <td class="px-6 py-4">
                        {
                          item?.title ? <div class="group relative">
                            <p >{truncateString(item?.title || "", 10) || "-"}</p>
                            <span class="absolute bg-gray-200 top-5 scale-0 rounded  p-2 text-xs text-black group-hover:scale-100">{item?.title}</span>
                          </div> : "-"
                        }
                      </td>
                      <td>
                      <p className='text-black'>{moment(item.updated_at)?.format('DD-MM-YYYY , hh:mm a')}</p>
                      </td>
                      <td class="px-6 py-4">
                        {
                          item.crawler_status === 0 ? <div class="led-box">
                            <div class="led-red"></div>
                          </div> : <div class="led-box">
                            <div class="led-green"></div>
                          </div>
                        }

                        {/* {item.crawler_status} */}
                      </td>

                      <td class="px-6 py-4">
                        {item.actions}
                      </td>
                    </tr>
                  }))
                }
                {/* Row */}

              </tbody>
            </table>
          }


        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
