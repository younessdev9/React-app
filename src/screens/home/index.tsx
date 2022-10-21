import React, { useCallback, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { RightArrow, LeftArrow, DollarIcon } from "../../assets/icons"

import { ApiResponse, FormValues } from "src/types"
import { cx } from "../../utils/cx"

export default function HomePage() {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormValues>()
    const [data, setData] = useState<ApiResponse[]>([])
    const [activeLoan, setActiveLoan] = useState<ApiResponse>()

    const fetchData = useCallback(
        async () =>
            fetch("/products.json")
                .then((res) => res.json())
                .then((res) => {
                    setData(res)
                    setActiveLoan(res[0])
                }),
        []
    )

    useEffect(() => {
        fetchData()
    }, [fetchData])
    useEffect(() => {
        reset()
    }, [activeLoan])
    const onSubmit = (values: FormValues) => {
        // login submitted data
        console.log(values)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-xl colo text-blue-1000 text-center mb-6">
                Le&apos;s plan your <span className="font-medium">loan.</span>
            </p>
            <div className="w-[560px] bg-white px-10 py-4 pb-10 rounded-lg">
                <div className="flex items-center justify-center gap-3">
                    {data.map((product) => (
                        <div key={product.id} className="flex flex-col">
                            <img
                                onClick={() => setActiveLoan(product)}
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
                            <div
                                className={cx(
                                    "h-1 mt-2",
                                    product.id === activeLoan?.id && " bg-blue-800 h-1"
                                )}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex gap-4 mt-6">
                    <div className="w-[272px]">
                        <label
                            htmlFor="loan-amount"
                            className="leading-normal text-sm text-darkBlue-500">
                            Loan amount
                        </label>
                        <div
                            className={cx(
                                "border-[1px] h-14 rounded flex items-center px-4 mt-1",
                                !!errors.loanAmount && "border-red-500"
                            )}>
                            <DollarIcon />
                            {/* Used Controller so I can control the value */}
                            <Controller
                                control={control}
                                name="loanAmount"
                                defaultValue={0}
                                rules={{
                                    max: {
                                        value: Number(activeLoan?.max_amount),
                                        message:
                                            "max amount for this loan is " +
                                            Number(activeLoan?.max_amount),
                                    },
                                    min: {
                                        value: Number(activeLoan?.min_amount),
                                        message:
                                            "minimum amount for this loan is " +
                                            Number(activeLoan?.min_amount),
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        id="loan-amount"
                                        className="flex-1 outline-none ml-3"
                                        value={field.value}
                                        onChange={(e) =>
                                            !isNaN(Number(e.target.value)) && field.onChange(e)
                                        }
                                    />
                                )}
                            />
                        </div>
                        <span className="text-red-500 text-sm">
                            {errors.loanAmount && errors.loanAmount.message}
                        </span>
                    </div>
                    <div className="w-[192px]">
                        <label
                            htmlFor="number-of-months"
                            className="leading-normal mb-1 text-sm text-darkBlue-500">
                            Number of Months
                        </label>

                        <Controller
                            control={control}
                            name="monthsCount"
                            defaultValue={0}
                            rules={{
                                max: {
                                    value: Number(activeLoan?.max_tenure),
                                    message:
                                        "max months allowed is: " + Number(activeLoan?.max_tenure),
                                },
                                min: {
                                    value: Number(activeLoan?.min_tenure),
                                    message:
                                        "minimum months allowed " + Number(activeLoan?.min_tenure),
                                },
                            }}
                            render={({ field }) => (
                                <div
                                    className={cx(
                                        "border-[1px] h-14 rounded flex items-center px-4 mt-1",
                                        !!errors.monthsCount && "border-red-500"
                                    )}>
                                    <LeftArrow
                                        onClick={() => field.onChange(field.value - 1)}
                                        width="30px"
                                        className="cursor-pointer"
                                    />
                                    <input
                                        id="number-of-months"
                                        className="outline-none ml-3 w-full text-center"
                                        value={field.value}
                                        onChange={(e) =>
                                            isNaN(Number(e.target.value)) && field.onChange(e)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "ArrowUp") {
                                                field.onChange(field.value + 1)
                                            } else if (e.key === "ArrowDown") {
                                                field.onChange(field.value + 1)
                                            }
                                        }}
                                    />
                                    <RightArrow
                                        onClick={() => field.onChange(field.value + 1)}
                                        width="30px"
                                        className="cursor-pointer"
                                    />
                                </div>
                            )}
                        />
                        <span className="text-red-500 text-sm">
                            {errors.monthsCount && errors.monthsCount.message}
                        </span>
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
