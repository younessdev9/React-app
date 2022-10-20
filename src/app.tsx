import React from "react"
import Layout from "@components/Layout"
import ReactDOM from "react-dom"
import "./index.css"
import HomePage from "@screens/home"

const App = () => (
    <Layout>
        <HomePage />
    </Layout>
)

ReactDOM.render(<App />, document.getElementById("root"))
