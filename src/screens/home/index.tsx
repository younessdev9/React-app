import React, { useCallback, useEffect, useState } from "react"
import { RightArrow, LeftArrow, DollarIcon } from "../../assets/icons"

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
        <form>
            <p className="text-xl colo text-blue-1000 text-center mb-6">
                Le&apos;s plan your <span className="font-medium">loan.</span>
            </p>
            <div className="w-[560px] bg-white px-10 py-4 pb-10 rounded-lg">
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
                <div className="flex gap-4 mt-6">
                    <div className="w-[272px]">
                        <label
                            htmlFor="loan-amount"
                            className="leading-normal text-sm text-darkBlue-500">
                            Loan amount
                        </label>
                        <div className="border-[1px] h-14 rounded flex items-center px-4 mt-1">
                            <DollarIcon />
                            <input id="loan-amount" className="flex-1 outline-none ml-3 " />
                        </div>
                    </div>
                    <div className="w-[192px]">
                        <label
                            htmlFor="number-of-months"
                            className="leading-normal mb-1 text-sm text-darkBlue-500">
                            Number of Months
                        </label>
                        <div className="border-[1px] h-14 rounded flex items-center px-4 mt-1">
                            <LeftArrow />
                            <input
                                id="number-of-months"
                                className="outline-none ml-3 w-full text-center"
                            />
                            <RightArrow />
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border-[1px] mt-6">
                    <div className="h-[78px] flex justify-around items-center">
                        <p className="text-xl">Monthly amount</p>
                        <p className="text-[32px] font-medium text-blue-800 ">$354</p>
                    </div>
                    <div className="h-20 bg-blue-300 px-8 py-6">
                        <p className="text-xs">
                            You&apos;re planning 12 monthly deposits to reach your $25,000 goal by
                            July 2022. The total amount loaned will be $26,300
                        </p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="w-[320px] py-[18px] rounded-[32px] bg-blue-1000 text-white font-semibold mt-8">
                        Apply Now
                    </button>
                </div>
            </div>
        </form>
    )
}
