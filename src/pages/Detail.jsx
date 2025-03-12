import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BeritaTerbaru from "../components/BeritaTerpopuler";
import { useFetchBerita } from "../hooks/useFetchBerita";

export default function Detail() {
  const location = useLocation();
  const { item } = location.state || {};
  const { slug_kategori } = useParams();
  const kategori = slug_kategori || "ekonomi";
  const { data, loading, error } = useFetchBerita(kategori);
  const [limitedData, setLimitedData] = useState([]);
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
      const limitedPosts = data.posts.slice(0, 3);
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

  if (!item) {
    return <div>No item data available</div>;
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-5 font-normal text-lg font-inter pt-44 px-18">
        <img src={"/home.png"} alt="home" className="w-5 h-5" />
        <h1>Beranda</h1>
        <h1>&gt;</h1>
        <h1>{formatString(slug_kategori)}</h1>
        <h1>&gt;</h1>
        <h1>Detail</h1>
      </div>

      <div className="w-full flex flex-row">
        <div className="w-[70%] px-18 mt-20">
          <h1 className="text-4xl font-bold">{item.title}</h1>
          <div className="flex flex-row gap-3 items-center mt-8">
            <div className="font-inter text-lg text-blue-500 font-semibold">
              {formatString(slug_kategori)}
            </div>
            <div className="w-[5px] h-[5px] bg-gray-500 rounded-full"></div>
            <div className="font-inter text-lg text-gray-500 font-medium">
              {formatDate(item.pubDate)}
            </div>
          </div>
          <img
            src={item.thumbnail}
            alt="foto"
            className="w-full rounded-4xl mt-8"
          />
          <h1 className="font-inter text-lg font-normal mt-20">
            {item.description}
          </h1>

          <div>
            <div className="flex flex-row mt-20">
              <h1 className="font-bold text-2xl border-l-2 border-blue-500 pl-5">
                Komentar
              </h1>
            </div>

            <div className="w-full mt-8 border-b-1 border-gray-300 pb-12">
              <div className="w-full flex flex-row gap-10">
                <img src={"/admin.png"} alt="" className="w-15 h-15" />
                <textarea
                  className="outline-none w-full border-1 border-gray-300 rounded-xl pt-3 pl-4"
                  name="Komentar"
                  id=""
                  placeholder="Apa yang ingin anda tanyakan?"
                ></textarea>
              </div>
              <button className="bg-blue-500 text-white text-xl px-8 py-4 rounded-lg mt-8 ml-36">
                Kirim
              </button>
            </div>

            <div className="mt-8 ml-36 flex flex-row border-b-1 border-gray-300 pb-12">
              <img src={"/ujang.png"} alt="" className="w-15 h-15" />
              <div className="ml-4">
                <div className="flex flex-row gap-4 items-center">
                  <div>
                    <h1 className="font-inter font-normal text-sm">
                      UJANG YUSMEIDI S.P., M.Agr.
                    </h1>
                  </div>
                  <div className="w-[5px] h-[5px] bg-gray-500 rounded-full"></div>
                  <div>
                    <h1 className="font-inter font-normal text-sm">
                      28 Mar 2024 11:15
                    </h1>
                  </div>
                </div>
                <div>
                  <h1 className="mt-4 font-inter font-normal text-sm">
                    Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh ?
                    Karena saya mau download ada konfirmasi bahwa TOTP aktivasi
                    salah Bagaimana ya solusinya ?
                  </h1>
                </div>
                <div>
                  <h1 className="text-blue-500 font-inter font-normal text-sm mt-4">
                    Balas
                  </h1>
                </div>
                <div className="mt-8 flex flex-row">
                  <img src={"/dina.png"} alt="" className="w-15 h-15" />
                  <div className="ml-4">
                    <div className="flex flex-row gap-4 items-center">
                      <div>
                        <h1 className="font-inter font-normal text-sm">
                          DINA RIKHA RIYANAWATI, S.Pd
                        </h1>
                      </div>
                      <div className="w-[5px] h-[5px] bg-gray-500 rounded-full"></div>
                      <div>
                        <h1 className="font-inter font-normal text-sm">
                          28 Mar 2024 11:15
                        </h1>
                      </div>
                    </div>
                    <div>
                      <h1 className="mt-4 font-inter font-normal text-sm">
                        saya mengunduh sertifikatnya kok juga belumbisa
                      </h1>
                    </div>
                    <div>
                      <h1 className="text-blue-500 font-inter font-normal text-sm mt-4">
                        Balas
                      </h1>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mt-24 mb-30">
            <div className="flex flex-row">
              <h1 className="font-bold text-2xl border-l-2 border-blue-500 pl-5">
                Berita Terkait
              </h1>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-3 gap-4 justify-center">
                {limitedData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleClick(item)}
                    className="flex flex-col mt-12 w-fit"
                  >
                    <div className="w-fit">
                      <img
                        className="w-[250px] h-[200px] rounded-xl"
                        src={item.thumbnail}
                        alt=""
                      />
                    </div>
                    <div className="w-[250px] mt-4">
                      <div className="font-bold text-lg line-clamp-3">
                        {item.title}
                      </div>
                      <div className="flex flex-row gap-3 items-center mt-4">
                        <div className="font-inter text-sm text-blue-500 font-semibold">
                          {slug_kategori
                            ? formatString(slug_kategori)
                            : "Teknologi"}
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
          </div>
        </div>

        <div className="w-[30%] pt-20 relative">
          <div className="sticky top-40">
            <BeritaTerbaru rotation={"vertical"} />
          </div>
        </div>
      </div>
    </div>
  );
}
