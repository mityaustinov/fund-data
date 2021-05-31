import React from 'react'

const Bar = props => {
    const {year, result, i} = props
    const xPosition = (i+1)*35
    const yPosition = 100 - result
    const textXPosition = (i+1)*35 + 5

    return (
        <g key={year}>
            <rect stroke="null" width="34" height={`${result}%`} x={`${xPosition}`} y={`${yPosition}%`} fill="#81cbfc"/>
            <text fontFamily="sans-serif" fontSize="10" x={`${textXPosition}`} y="180" strokeWidth="0" fill="#000000">{result}</text>
            <text fontFamily="sans-serif" fontSize="10" strokeWidth="0" x={`${textXPosition}`} y="195" fill="#000000">{year}</text>
        </g>
    )
}

export default Bar
