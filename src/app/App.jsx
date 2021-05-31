import React, { Component } from 'react'
import { Bar, Entry } from 'components'

class App extends Component {
    constructor() {
        super()

        this.state = {
            fundData: null,
        }
    }

    componentDidMount() {
        const fundApi = 'https://vam-fi-graphs.s3.eu-north-1.amazonaws.com/FI4000013156.json'

        fetch(fundApi)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw response.error
            })
            .then(
                data => data.reduce(function(object, item) {
                    const dateToKey = parseInt([item[0]])
                    if (dateToKey in object) {
                        object[dateToKey].push(item[1]);
                    }
                    else {
                        object[dateToKey] = [item[1]];
                    }
                    return object;
                }, {})
            )
            .then(fundData => this.setState({ fundData }))
    }

    render() {

        const calculateDifference = (a, b) => {
            if(a < b) {
                return ((b-a) / a) * 100
            } else if(a > b) {
                return ((a-b) / a) * 100
            }
        }

        const calculateSwing = (a, b) => {
            if (a > b) {
                return a - b
            } else if (a < b) {
                return b - a
            }
        }

        const getYearDifference = (object) => Object.entries(object).map(entry => {
            //console.log(entry);
            const [key, value] = entry
            const start = value[0]
            const end = value[value.length - 1]
            const difference = parseFloat(calculateDifference(start, end)).toFixed(2)
    
            return [key, difference]
        })

        const getYearSwing = (object) => Object.entries(object).map(entry => {
            const [key, value] = entry
            const sortedResults = value.slice().sort((a, b) => a - b)
            // console.log(sortedResults)

            const lowest = sortedResults[0]
            const highest = sortedResults[sortedResults.length - 1]
            const swing = parseFloat(calculateSwing(lowest, highest)).toFixed(2)
    
            return [key, swing]
        })

        return (
            <>
                <section>
                    <h2>Difference</h2>
                    <ul className="horizontal-bars">
                        {this.state.fundData !== null &&
                            getYearDifference(this.state.fundData).sort((a, b) => b[1]-a[1]).map(item => {
                                const [year, result] = item
                                return(
                                    <Entry key={`d${year}`} year={year} result={result} percentage={true} />
                                )
                            })
                        }
                    </ul>
                </section>

                <section>
                    <h2>Swing</h2>
                    <ul>
                        {this.state.fundData !== null &&
                            getYearSwing(this.state.fundData).map(item => {
                                const [year, result] = item
                                return(
                                    <Entry key={`s${year}`} year={year} result={result} />
                                )
                            })
                        }
                    </ul>

                    <svg width="100%" height="200">
                        <rect width="95%" height="200" x="36" y="0" stroke="#dddddd" fill="#fff"/>
                        <line id="line25" x1="36" x2="100%" y2="75%" y1="75%" stroke="#dddddd" strokeDasharray="5,5" fill="none"/>
                        <line id="line50" x1="36" x2="100%" y2="50%" y1="50%" stroke="#dddddd" strokeDasharray="5,5" fill="none"/>
                        <line id="line75" x1="36" x2="100%" y2="25%" y1="25%" stroke="#dddddd" strokeDasharray="5,5" fill="none"/>
                        <text fontFamily="sans-serif" fontSize="10" strokeWidth="0" y="100%" x="11" fill="#000000">0%</text>
                        <text fontFamily="sans-serif" fontSize="10" strokeWidth="0" y="150" x="5" sfill="#000000">25%</text>
                        <text fontFamily="sans-serif" fontSize="10" strokeWidth="0" y="100" x="5" fill="#000000">50%</text>
                        <text fontFamily="sans-serif" fontSize="10" strokeWidth="0" y="50" x="5" fill="#000000">75%</text>
                        <text fontFamily="sans-serif" fontSize="10" strokeWidth="0" y="9" x="0" fill="#000000">100%</text>
                        
                        {this.state.fundData !== null &&
                            getYearSwing(this.state.fundData).map((item, i) => {
                                const [year, result] = item
                                return( 
                                    <Bar key={`b${year}`} year={year} result={result} i={i} />
                                )
                            })
                        }
                    </svg>
                </section>
            </>
        )
    }
}

export default App
