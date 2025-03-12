import { axiosInstance } from "../lib/axios"
import { useEffect, useState } from "react"

export function useFetchBerita(slug_kategori) {
    const [berita, setBerita] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchBerita = async (slug_kategori) => {
        const res = await axiosInstance.get(`/${slug_kategori}`)
        const data = res.data.data
        setBerita(data)
        setLoading(false)
    }
    useEffect(() => {
        fetchBerita(slug_kategori)
    }, [slug_kategori])


    return {
        data: berita,
        loading
    }
}