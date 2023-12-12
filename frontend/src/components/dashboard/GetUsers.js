import axios from "axios";
import {useEffect, useState } from "react";
import DeleteUser from './DeleteUser'
import UpdateUser from './UpdateUser'

export default function GetUsers({setselecteduser,getdeleteuser,getupdateuser}) {

  const [users, getuser] = useState([{}]);
  const token = localStorage.getItem("token");
  useEffect(()=>{
    axios
    .get("/users", { headers: { Authorization: `Bearer ${token} ` } })
    .then((res) => {
      const Users = res.data;
      getuser(Users);
    })
 
    .catch((err) => {});
  },[users])
  const handelClickdelete=(id)=>{
    setselecteduser(id)
    getdeleteuser(true)
  } 
  const handelClickupdate=(id)=>{
    setselecteduser(id)
    getupdateuser(true)
  } 


  return (
    <>
        <div className="  col-span-full  bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Users</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">User Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Role</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">blog Link</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  
                </th>    
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                users.map((user,idx) => {
                  if(user.role==="admin"){
                    return (
                      <tr key={idx}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-[50px] h-[50px] shrink-0 mr-2 sm:mr-3">
                              <img className="rounded-full" src={user.picture} width="40" height="40" alt={user.firstName} />
                            </div>
                            <div className="font-medium text-slate-800">{user.userName}</div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-green-500">{user.role}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-black-500">{user.blogLink}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap items-center">
                          
                          <button
                          type="button"
                          className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={()=>{handelClickupdate(user._id)}}
                          >
                          
                          Update
                          </button>                        
                          <button
                          type="button"
                          className=" inline-block ml-3 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"  
                          onClick={()=>{handelClickdelete(user._id)}}
                          >
                          Delete
                          </button>
                        
                        </td>
                      </tr>
                    )
                  }
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
    </>
     )
    }
   