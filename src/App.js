import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      utcTime: '',
      localTime: '',
      day: "00",
      mon: "00",
      year: "0000",
      mm: "00",
      hh: "00",
      ss: "00",
      localMilliSec: '',
    }
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        curLocalTime: new Date().toLocaleTimeString(),
        curUtcTime: new Date().toUTCString(),
        curUTCSec: Date.now()
      })
    }, 1000)
  }

  formatDate = () => {
    const formattedDate = new Date().toDateString();
    const [, month, day, year] = formattedDate.split(' ')
    return `${day} ${month} ${year}`
  }

  curSecHandleChange = (e) => {
    this.setState({
      milliSec: e.target.value
    }, () => {
      this.state.milliSec !== '' ? this.setState({
        utcTime: new Date(parseInt(this.state.milliSec)).toUTCString(),
        localTime: new Date(parseInt(this.state.milliSec)).toDateString() + ' ' + new Date(parseInt(this.state.milliSec)).toTimeString().split(' ')[0]
      }) : this.setState({
        utcTime: '',
        localTime: ''
      })
    }
    )
  }

  handleChange = (e, name) => {
    this.setState({
      [name]: (e.target.value)
    }, () => {
      const time = `${this.state.year}-${this.state.mon}-${this.state.day}T${this.state.hh}:${this.state.mm}:${this.state.ss}+0530`;
      this.setState({
        localMilliSec: new Date(time).getTime()
      })
    })
  }

  render(props) {
    return (
      <React.Fragment>
        <div className="form_content">
          <div className="form_row">
            <div className="form_dive">
              <div className="textheding">
                <span>UTC date</span>
                <strong>{this.formatDate()}</strong>
              </div>
            </div>
            <div className="form_dive">
              <div className="textheding">
                <div className="textheding">
                  <span>local date </span>
                  <strong>{this.formatDate()}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="form_row">
            <div className="form_dive">
              <div className="textheding">
                <span>UTC time  </span>
                <strong>{this.state.curUtcTime}</strong>
              </div>
            </div>
            <div className="form_dive">
              <div className="textheding">
                <div className="textheding">
                  <span>local time </span>
                  <strong>{this.state.curLocalTime}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="form_row">
            <div className="form_dive">
              <div className="textheding">
                <span>UNIX time </span>
                <strong>{this.state.curUTCSec}</strong>
              </div>
            </div>
            <div className="form_dive">
              <div className="textheding">
                <div className="textheding">
                  <span>local timezone (UTC+5h)</span>
                  <strong>India Standard </strong>
                </div>
              </div>
            </div>
          </div>
          <div className="form_row">
            <div className="form_dive">
              <div className="textheding">
                <div className="inputbox">
                  <label>Convert seconds</label>
                  <input type="text" onChange={e => { this.curSecHandleChange(e) }} />
                </div>
              </div>
            </div>
            <div className="form_dive">
              <div className="textheding">
                <div className="inputbox">
                  <label>Convert local YYYY / MM / DD </label>
                  <div className="input_mul">
                    <input minLength="4" maxLength="4" onChange={e => { this.handleChange(e, 'year') }} />
                    <input className="borderlr" minLength="2" maxLength="2" onChange={e => { this.handleChange(e, 'mon') }} />
                    <input minLength="2" maxLength="2" onChange={e => { this.handleChange(e, 'day') }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form_row">
            <div className="form_dive">
              <div className="textheding">
                <div className="inputbox bornone">
                  <label>to UTC time & date:</label>
                  <input disabled={true} value={this.state.utcTime} />
                </div>
              </div>
            </div>
            <div className="form_dive">
              <div className="textheding">
                <div className="inputbox">
                  <label>and HH : MM : SS </label>
                  <div className="input_mul">
                    <input type="text" maxLength="2" pattern="-?[0-9]*(\.[0-9]+)?" onChange={e => { this.handleChange(e, 'hh') }} />
                    <input className="borderlr" type="text" maxLength="2" pattern="-?[0-9]*(\.[0-9]+)?" onChange={e => { this.handleChange(e, 'mm') }} />
                    <input type="text" maxLength="4" pattern="-?[0-9]*(\.[0-9]+)?" onChange={e => { this.handleChange(e, 'ss') }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form_row">
            <div className="form_dive">
              <div className="textheding">
                <div className="inputbox bornone">
                  <label>to local time & date:</label>
                  <input disabled={true} value={this.state.localTime} />
                </div>
              </div>
            </div>
            <div className="form_dive">
              <div className="textheding">
                <div className="inputbox bornone">
                  <label>to seconds since epoch: </label>
                  <input disabled={true} value={this.state.localMilliSec ? this.state.localMilliSec : ''} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
