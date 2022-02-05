import App from "./App"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import './i18n'
import {Suspense} from 'react'
ReactDOM.render(
    //main route
    <React.StrictMode>
        <Router>
        <Suspense fallback={(<div>loading ~~~</div>)}>
        <App></App>
        </Suspense>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
