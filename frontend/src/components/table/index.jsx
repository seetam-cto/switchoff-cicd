import React from 'react'
import "./style.scss"

const Table = props => {
    return (
        <div className="table-wrapper">
            {props.children}
        </div>
    )
}

export const TableHead = props => {
    return (
        <ul className='table-head'>
            {props.children}
        </ul>
    )
}

export const TableBody = props => {
    return (
        <div className='table-body'>
            {props.children}
        </div>
    )
}

export const TH = props => {
    return (
        <li className={`table-head-th w-${props.width}`}>
            {props.children}
        </li>
    )
}

export default Table


