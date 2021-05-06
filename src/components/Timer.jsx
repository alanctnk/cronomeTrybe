import React, { Component } from 'react'


export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      min: 0,
      sec: 0,
      stop: true, 
    }
  }
  componentDidMount() {
    const {minutes, seconds} = this.props
    if(minutes || seconds) {

      this.setState({ min: parseInt(minutes), sec: parseInt(seconds) })
      const {style} = document.getElementById('progress')
      style.strokeDashoffset = `calc(240 - (240 * 100) / 100)`
      this.timer = setInterval(() => {
        if(!this.state.sec) {
          this.setState(oldState => ({...oldState, min: this.state.min-1, sec: 60}))
        }
        this.setState(oldState => ({...oldState, sec: this.state.sec-1}))
      }, 1000)
    }
  }
  
  componentDidUpdate(){
    const {minutes, seconds} = this.props
    
    const {min, sec} = this.state
    const timeProp = parseInt(minutes * 60) + parseInt(seconds)
    const timeState = parseInt(min * 60) + parseInt(sec)
    const {style} = document.getElementById('progress')
    const percentage = ((timeState/timeProp) * 100).toFixed(2)
    style.strokeDashoffset = `calc(240 - (240 * ${percentage}) / 100)`
    if(!this.state.min && !this.state.sec) {
      const listLinks = [
        'https://media.giphy.com/media/tIkn1XiX95mZPDZ4Gr/giphy.gif',
        'https://media.giphy.com/media/lffW0sDfrzBXr1AxME/giphy.gif',
        'https://media.giphy.com/media/KyCFtZE3LvGom5Imdj/giphy.gif',
        'https://media.giphy.com/media/jqScOnk9Dqk7ILU4kF/giphy.gif',
        'https://media.giphy.com/media/RgnTXvE24wFjUhB3Dt/giphy.gif',
        'https://media.giphy.com/media/xUySTEJYS5F1Cayg92/giphy.gif',
      ]
      clearInterval(this.timer)
      setTimeout(() => {
        const random = Math.round((listLinks.length - 1) * Math.random())
        const source = listLinks[random]
        // const source = './animation.gif'
        const box = document.querySelector('.box')
        box.innerHTML = `<img src="${source}" width="500px" alt="tempo esgotado">`

      }, 500)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    // console.log("morri")
  }
  
  render() {
    const {min, sec} = this.state
    return (
      <div className="box">
        <div className="percent">
          <svg viewBox="0 0 80 80" width="220" height="220">
            <circle cx="40" cy="40" r="38"></circle>
            <circle id="progress" cx="40" cy="40" r="38"></circle>
          </svg>
          <div className="number">
            <h2>{min >= 10 ? min : `0${min}`} : {sec >= 10 ? sec : `0${sec}`} </h2>             
          </div>          
        </div>
        <h2 className="text">
          Aguarde . . .
        </h2>        
      </div>
    )
  }
}
