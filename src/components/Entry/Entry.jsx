import React from 'react'

const Entry = props => {
    const {year, result, percentage} = props
    const itemStyle = {width: result + '%'}

    return (
        <>
        {percentage ? 
            <li>
                <div style={itemStyle}>
                    <b>{year}:</b> {result}%
                </div>
            </li>
        :
            <li>
                <div>
                    <b>{year}:</b> {result}
                </div>
            </li> 
        }
        </>
        
    )
}

export default Entry
