import { useEffect, useState } from "react";
import axios from "axios";
export default function Getpodcasts({
  getupdatepodcast,
  getdeletepodcast,
  setselectedpodcast
}) {
  const [id, setId] = useState("");
  const [Podcast, getPodcast] = useState([{}]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("auth/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setId(res.data.id);
      });
    axios
      .get(`/podcasts/mypodcasts/${id}`)
      .then((res) => {
        const Podcast = res.data;
        getPodcast(Podcast);
      })
      .catch((err) => {});
  }, [id,Podcast]);

  const deleteclick = (id) => {
    setselectedpodcast(id);
    getdeletepodcast(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const updateclick = (id) => {
    setselectedpodcast(id);
    getupdatepodcast(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      {Podcast.map((res, idx) => {
        return (
          <>
            <div className="relative pb-[50px]">
              <div className="flex flex-col col-span-full xl:col-span-2 rounded-sm ">
                <div className="flex justify-center">
                  <div className="rounded-lg shadow-lg mt-[50px] bg-white max-w-[300px]">
                    <img src={res.cover} alt="" />

                    <div className="p-6">
                      <h5 className="text-gray-900 text-xl font-medium mb-2">
                        {res.title}
                      </h5>
                      <p className="text-gray-900 text-[15px] font-light mb-2"></p>
                      <button
                        type="button"
                        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={() => {
                          updateclick(res.id);
                        }}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className=" inline-block ml-3 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={() => {
                          deleteclick(res.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
