import React, { useCallback, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { NumericFormat } from "react-number-format"

import { RightArrow, LeftArrow, DollarIcon } from "../../assets/icons"

import { ApiResponse, FormValues } from "src/types"
import { cx } from "../../utils/cx"
import { getTargetMonth } from "../../utils/getTargetMonth"

// I've put everything is one file because the app is small but usually when working on large apps
// you'd decouple your components create and create reusable kits

export default function HomePage() {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        watch,
        getValues,
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

    // Validation is triggered when user click Apply now button But
    const onSubmit = (values: FormValues) => {
        // login submitted data
        console.log(values)
    }
    // total amount = loan amount + (loan amount * product interest)
    const getTotalAmount = () => {
        const loanAmount = Number(getValues("loanAmount"))
        return loanAmount + loanAmount * Number(activeLoan?.interest)
    }
    // monthly installment = total amount / # months

    const getTotalInstallment = Math.floor(
        Number(watch("loanAmount")) / Number(watch("monthsCount"))
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="w-11/12 md:w-auto">
            <p className="text-xl colo text-blue-1000 text-center mb-6">
                Le&apos;s plan your <span className="font-medium">loan.</span>
            </p>
            <div className="md:w-[560px] bg-white px-10 py-4 pb-10 rounded-lg">
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
                <div className="flex md:flex-nowrap flex-wrap gap-4 mt-6">
                    <div className="md:w-[272px] flex-auto">
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
                            <Controller
                                control={control}
                                name="loanAmount"
                                defaultValue={0}
                                rules={{
                                    max: {
                                        value: Number(activeLoan?.max_amount),
                                        message:
                                            "maximum amount allowed is: " +
                                            Number(activeLoan?.max_amount),
                                    },
                                    min: {
                                        value: Number(activeLoan?.min_amount),
                                        message:
                                            "minimum amount allowed is: " +
                                            Number(activeLoan?.min_amount),
                                    },
                                }}
                                render={({ field }) => (
                                    <NumericFormat
                                        value={field.value}
                                        className="flex-1 outline-none ml-3"
                                        onChange={field.onChange}
                                        allowLeadingZeros
                                        thousandSeparator=","
                                        decimalScale={2}
                                    />
                                )}
                            />
                        </div>
                        <span className="text-red-500 text-sm">
                            {errors.loanAmount && errors.loanAmount.message}
                        </span>
                    </div>
                    <div className="md:w-[192px] w-full mt-4 md:mt-0">
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
                                        "maximum months allowed: " + Number(activeLoan?.max_tenure),
                                },
                                min: {
                                    value: Number(activeLoan?.min_tenure),
                                    message:
                                        "minimum months allowed: " + Number(activeLoan?.min_tenure),
                                },
                            }}
                            render={({ field }) => (
                                <div
                                    className={cx(
                                        "border-[1px] h-14 rounded flex items-center px-4 mt-1",
                                        !!errors.monthsCount && "border-red-500"
                                    )}>
                                    <LeftArrow
                                        onClick={() => field.onChange(Number(field.value) - 1)}
                                        width="30px"
                                        className="cursor-pointer"
                                    />
                                    <input
                                        id="number-of-months"
                                        className="outline-none ml-3 w-full text-center"
                                        value={field.value}
                                        type="number"
                                        min={0}
                                        onChange={field.onChange}
                                    />
                                    <RightArrow
                                        onClick={() => field.onChange(Number(field.value) + 1)}
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
                        <p className="md:text-[32px] text-lg font-medium text-blue-800">
                            $
                            {!isNaN(getTotalInstallment) &&
                                isFinite(getTotalInstallment) &&
                                getTotalInstallment}
                        </p>
                    </div>
                    <div className=" bg-blue-300 px-8 py-6">
                        <p className="text-xs">
                            You&apos;re planning {watch("monthsCount")}{" "}
                            <span className="font-medium"> monthly deposits</span> to reach your
                            <span className="font-medium"> ${watch("loanAmount")} </span>goal by{" "}
                            {watch("monthsCount") && getTargetMonth(Number(watch("monthsCount")))}.
                            The total amount loaned will be $
                            {!isNaN(getTotalAmount()) && getTotalAmount()}
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
