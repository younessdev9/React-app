import React, { useCallback, useEffect, useState } from "react"
import type { ApiResponse } from "src/types"
import { cx } from "../../utils/cx"

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
        <div>
            <p className="text-xl colo text-blue-1000 text-center mb-6">
                Le&apos;s plan your <span className="font-medium">loan.</span>
            </p>
            <div className="w-[560px] bg-white px-10 py-4 rounded-lg">
                <div className="flex items-center justify-center gap-3">
                    {data.map((product) => (
                        <img
                            key={product.id}
                            src={product.image}
                            alt={product.name}
                            className={cx(
                                product.name === "Automobile Loan"
                                    ? "w-[89px] h-[86px]"
                                    : product.name === "Housing Loan"
                                    ? "w-[74px] h-[69px]"
                                    : "w-[69px] h-[69px]"
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
