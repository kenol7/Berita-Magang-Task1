import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchBerita } from "../hooks/useFetchBerita";

export default function Rekomendasi() {
  const { slug_kategori } = useParams();
  const kategori = slug_kategori || "teknologi";
  const { data, loading, error } = useFetchBerita(kategori);
  const [limitedData, setLimitedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/${kategori}/detail`, { state: { item } });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };

  const formatString = (stringInput) => {
    return stringInput
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  useEffect(() => {
    if (data && data.posts) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const limitedPosts = data.posts.slice(
        startIndex,
        startIndex + itemsPerPage
      );
      setLimitedData(limitedPosts);
      setFilteredData(limitedPosts);
    }
  }, [data, currentPage]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(limitedData);
    } else {
      const filteredPosts = limitedData.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredPosts);
    }
  }, [searchQuery, limitedData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (filteredData.length === 0) {
    return <div>No data available</div>;
  }

  const totalPages = Math.ceil(data.posts.length / itemsPerPage);

  return (
    <div className="px-18 flex flex-col w-full mt-40">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl border-l-2 border-blue-500 pl-5">
          Rekomendasi Untuk Anda
        </h1>
        <div className="px-4 py-3 rounded-lg border-2 border-gray-300 w-1/4 flex flex-row justify-between items-center">
          <input
            type="text"
            placeholder="Cari disini..."
            className="font-inter text-lg text-gray-400 font-normal outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img className="w-[20px] h-[20px]" src={"/Search.png"} alt="search" />
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-4 gap-4 justify-center place-items-center">
          {filteredData.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item)}
              className="flex flex-col mt-12 w-fit"
            >
              <div className="w-fit">
                <img
                  className="w-[350px] h-[290px] rounded-xl"
                  src={item.thumbnail}
                  alt=""
                />
              </div>
              <div className="w-[350px] mt-4">
                <div className="font-bold text-lg line-clamp-3">
                  {item.title}
                </div>
                <div className="flex flex-row gap-3 items-center mt-4">
                  <div className="font-inter text-sm text-blue-500 font-semibold">
                    {slug_kategori ? formatString(slug_kategori) : "Teknologi"}
                  </div>
                  <div className="w-[5px] h-[5px] bg-gray-500 rounded-full"></div>
                  <div className="font-inter text-sm text-gray-500 font-medium">
                    {formatDate(item.pubDate)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {searchQuery === "" && (
        <div className="flex justify-end mt-20">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-[150px] h-[50px] px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-10 font-bold">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="w-[150px] h-[50px] px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
