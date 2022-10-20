import React, { useCallback, useEffect, useState } from "react"
import type { ApiResponse } from "src/types"

export default function HomePage() {
    const [data, setData] = useState<ApiResponse[]>([])
    const fetchData = useCallback(
        async () =>
            fetch("/products.json")
                .then((res) => res.json())
                .then((res) => setData(res)),
        []
    )

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className="w-[560px] bg-white px-10 py-4">
            <div className="">
                {data.map((product) => (
                    <img key={product.id} src={product.image} alt={product.name} className="w-5" />
                ))}
            </div>
        </div>
    )
}
