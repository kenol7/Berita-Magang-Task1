import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchBerita } from "../hooks/useFetchBerita";

export default function BeritaTerpopuler({ rotation }) {
  const { slug_kategori } = useParams();
  const kategori = slug_kategori || "ekonomi";
  const { data, loading, error } = useFetchBerita(kategori);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [limitedData, setLimitedData] = useState([]);
  const intervalRef = useRef(null);
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
      const limitedPosts = data.posts.slice(5, 8);
      setLimitedData(limitedPosts);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (limitedData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="px-18 flex flex-col w-full">
      <div className="font-bold text-2xl border-l-2 border-blue-500 pl-5">
        Berita Terbaru
      </div>

      <div
        className={`flex ${
          rotation === "vertical" ? "flex-col" : "flex-row"
        } gap-4`}
      >
        {limitedData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            className="flex flex-row mt-12 px-4 w-full cursor-pointer"
          >
            <div className={`${rotation === "vertical" ? "w-fit" : "w-1/3"}`}>
              <div className="absolute z-10 text-white bg-[#1F2B39] rounded-full w-9 h-9 flex items-center justify-center -mt-3 -ml-3">
                {index + 1}
              </div>
              <img
                className={`${
                  rotation === "vertical" ? "w-[200px]" : "w-full"
                } h-[120px] rounded-xl`}
                src={item.thumbnail}
                alt=""
              />
            </div>
            <div className="w-2/3 ml-4">
              <div className="font-bold text-lg line-clamp-3">{item.title}</div>
              <div className="flex flex-row gap-3 items-center mt-4">
                <div className="font-inter text-sm text-blue-500 font-semibold">
                  {slug_kategori ? formatString(slug_kategori) : "ekonomi"}
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
  );
}
