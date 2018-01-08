const React = require("react")
const { Component } = require("react")
const ReactDom = require("react-dom")
class Line extends Component {
    constructor(props) {
        super(props)
        var config={
            width: 1100,
            height: 600,
            top: 50,
            left: 50,
            data: [
                { x: 0, y: 40 }, { x: 1, y: 35 },
                { x: 2, y: 23 }, { x: 3, y: 78 },
                { x: 4, y: 55 }, { x: 5, y: 18 },
                { x: 6, y: 98 }, { x: 7, y: 100 },
                { x: 8, y: 22 }, { x: 9, y: 65 }
            ]
        }
        this.state=Object.assign(config,this.props)    
        window.l = this
    }
    componentWillReceiveProps() {
        console.log("componentWillReceiveProps", arguments)
    }
    shouldComponentUpdate(nextprops, nextstate) {
        console.log("arc shouldComponentUpdate")
        return true
    }
    componentWillUpdate() {
        console.log("componentWillUpdate", arguments)
    }
    componentDidUpdate() {
        console.log("componentDidUpdate", arguments)
        d3.select("#lineAxis").select("g").remove()
        var data = this.state.data
        var xScale = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.x;
        })).range([0, this.state.width - 2 * this.state.left]);
        var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d.y;
        })]).range([this.state.height - 2 * this.state.top, 0]);
        var xAxis = d3.axisBottom(xScale)
        var yAxis = d3.axisLeft(yScale)
        d3.select("#lineAxis").append('g').call(yAxis)
        d3.select("#lineAxis").append('g').attr("transform", "translate(0," + (this.state.height - 2 * this.state.top) + ")").call(xAxis)
    }
    componentWillMount() {
        console.log("componentWillMount", arguments)
    }
    componentDidMount() {
        console.log("componentDidMount", arguments)
        var data = this.state.data
        var xScale = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.x;
        })).range([0, this.state.width - 2 * this.state.left]);
        var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d.y;
        })]).range([this.state.height - 2 * this.state.top, 0]);
        var xAxis = d3.axisBottom(xScale)
        var yAxis = d3.axisLeft(yScale)
        d3.select("#lineAxis").append('g').call(yAxis)
        d3.select("#lineAxis").append('g').attr("transform","translate(0,"+(this.state.height-2*this.state.top)+")").call(xAxis)
    }
    render() {
        console.log("render")
        var data=this.state.data
        var xScale = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.x;
        })).range([0, this.state.width - 2 * this.state.left]);
        var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d.y;
        })]).range([this.state.height - 2 * this.state.top, 0]);
        var line = d3.line().x(function (d) {
            return xScale(d.x)
        }).y(function (d) {
            return yScale(d.y);
        }).curve(d3.curveCatmullRom.alpha(0.5))
        this.state.xAxis = d3.axisBottom(xScale)
        this.state.yAxis = d3.axisLeft(yScale)
        return (<div><svg style={{
            width: this.state.width,
            height: this.state.height,
            userSelect: "none"
        }}>
            <g ref="g" style={{ "transform": 'translate(' + this.state.left + 'px, ' + this.state.top + 'px)'}}>
                <path d={line(data)} fill="none" strokeWidth="1px" stroke="red"></path>
                {this.state.data.map(item => {
                    return <circle cx={xScale(item.x)} cy={yScale(item.y)} r="4" stroke="black" strokeWidth="1" fill="#fff" />
                })}
            </g>
            <g id="lineAxis" style={{ "transform": 'translate(' + this.state.left + 'px, ' + this.state.top + 'px)' }}></g>
        </svg>
        <ul>
            {this.state.data.map(item=>{
                return <li>{"x: "+item.x+", y: "+item.y}</li>
            })}
        </ul>
        </div>)
    }
}
module.exports = Line
