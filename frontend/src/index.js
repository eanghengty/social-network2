import App from "./App"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
ReactDOM.render(
    //main route
    <React.StrictMode>
        <Router>
        <App></App>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
