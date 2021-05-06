import React, { Component } from 'react'
import { InputGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ClockTrybe from './ClockTrybe'
import Timer from './Timer'

export default class Watch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minutes: 0,
      seconds: 0,
      init: false, 
    }
  }
  
  sendTime() {
    const elements = document.querySelectorAll('.toHide')
    const [m, s] = [document.querySelector(`[name='minutes']`), document.querySelector(`[name='seconds']`)]
    const [condition1, condition2] = [
      (parseInt(m.value) >= 0 && parseInt(m.value) <= 99), (parseInt(s.value) >= 0 && parseInt(s.value) <= 59),
    ]
    const alerta = `Tempo inválido! Limite máximo de 99min e 59seg.`
    if (condition1 && condition2) {
      if (parseInt(m.value) === 0 && parseInt(s.value) === 0) {
        alert(alerta)
      } else {
        elements.forEach(el => el.style.display = 'none')
        this.setState({minutes: m.value || 0, seconds: s.value || 0, init: true})
        m.value = null
        s.value = null
      }
    } else {
      alert(alerta)
    }
  }
  stop() {
    const [m, s] = [document.querySelector(`[name='minutes']`), document.querySelector(`[name='seconds']`)]
    m.value = 0
    s.value = 0
    const elements = document.querySelectorAll('.toHide')
    elements.forEach(el => el.style.display = '')
    this.setState(oldState => ({...oldState, init: false}))
  }

  render() {
    const {minutes, seconds, init} = this.state
    return (
      <React.Fragment>
       
        {init ? <Timer minutes={minutes} seconds={seconds}/> :  <ClockTrybe/>}
 
        <br/>
        <div className="input-group toHide">

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">Minutos</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control className="form-control" defaultValue="0" name="minutes" type="number" min="0" max="99" />
          
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">Segundos</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control className="form-control" defaultValue="0" name="seconds" type="number" min="0" max="59" />
          
          </InputGroup>
        </div>
  
        <div className="button-group">
          <Button variant="primary" className="toHide" onClick={() => this.sendTime()}>Iniciar</Button>
          <Button variant="danger" onClick={() => this.stop()}>Encerrar</Button>
        </div>
  

      </React.Fragment>
    )
  }
}
