import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'

export default class ClockTrybe extends Component {
  constructor(props){
    super(props)
    this.state = {
      clock: null
    }
  }

  componentDidMount() {
    
    const myTimer = () => {
      let d = new Date();
      let t = d.toLocaleTimeString();
      this.setState({clock: t})
    }
    this.clocker = setInterval(myTimer, 100);
    
  }

  componentWillUnmount() {
    clearInterval(this.clocker)
  }

  render() {
    const {clock} = this.state
    return (
      <React.Fragment>

        <Alert className="quote" variant="info">
          <em>
            Que não se tenha pressa, mas que não se perca tempo.
          </em>
        </Alert>

        <>
          Hora local: {" "}
          <span className="number clock">
            {clock}
          </span>
          <hr/>
        </>
      </React.Fragment>
    )
  }
}
