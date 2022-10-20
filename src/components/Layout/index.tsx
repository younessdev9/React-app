import React, { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="w-full h-full flex justify-center items-center bg-lightBlue-300">
            {children}
        </div>
    )
}
