import "./tabs.scss"
import React from "react"

export const Tab = props => {
    return (
        <div className="tab-wrapper-main">
            {props.children}
        </div>
    )
}

export const TabHead = props => {
    return (
        <div onClick={() => props.clickTab(props.tab)} className={`tab-head ${props.active === props.tab ? 'active' : ''}`}>
            {props.children}
        </div>
    )
}

const Tabs = props => {
    return (
        <div className="tab-wrapper">
            {props.children}
        </div>
    )
}

export default Tabs
