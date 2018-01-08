const React = require("react")
const { Component } = require("react")
const ReactDom = require("react-dom")
class Area extends Component {
    constructor(props) {
        super(props)
        var config = {
            width: 1100,
            height: 600,
            innerRadius: 0,
            outerRadius: 250,
            data: [
                { "number": 4, "name": "Locke" },
                { "number": 8, "name": "Reyes" },
                { "number": 15, "name": "Ford" },
                { "number": 16, "name": "Jarrah" },
                { "number": 23, "name": "Shephard" },
                { "number": 42, "name": "Kwon" }
            ]
        }
        this.state = Object.assign(config, this.props)
        window.arc = this
    }
    componentWillReceiveProps(nextprops) {
        this.setState(Object.assign({},this.state, nextprops))
        window.nextprops = nextprops
        console.log(Object.assign({}, this.state, nextprops))
        console.log("arc componentWillReceiveProps", arguments)
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
    }
    componentWillMount() {
        console.log("componentWillMount", arguments)
    }
    componentDidMount() {
        console.log("componentDidMount", arguments)
    }
    render() {
        console.log("render")
        var arcdata = d3.pie().value(function (d) { return d.number; })(this.state.data);
        var arc = d3.arc().innerRadius(this.state.innerRadius).outerRadius(this.state.outerRadius)
        return (<div><svg style={{
            width: this.state.width,
            height: this.state.height,
            userSelect: "none"
        }}>
            <g ref="g" style={{ "transform": 'translate(' + (this.state.width / 2) + 'px, ' + (this.state.height / 2) + 'px)' }}>
                {arcdata.map(item => {
                    return (<path d={arc(item)} fill={"rgba(" + Math.round(Math.random() * 256) + "," + Math.round(Math.random() * 256) + "," + Math.round(Math.random() * 256) + "," + (Math.random() / 2 + 0.5) + ")"}>
                    </path>)
                })}
                {arcdata.map(item => {
                    return (<text fontSize="20px" fill="red" x={this.state.outerRadius / 2 + ""} y="20" transform={"rotate(" + ((item.endAngle + item.startAngle) * 360 / 4 / Math.PI - 90) + "  " + 0 + ",10)"}>{item.data.name + ":" + item.data.number}
                    </text>)
                })}
            </g>
        </svg>
            <ul>
                {arcdata.map((item, index) => {
                    return <li>{item.data.name + "  :  " + item.data.number}</li>
                })}
            </ul>
        </div>)
    }
}
module.exports = Area