import React, { Component } from 'react';
import './App.css';
import moment from 'moment';

class App extends Component {
  state = {
    now: '',
    today: '',
    thisWeek: [],
    thisMonth: [],
    thisYear: []
  }

  buildYear = (year) => {
    let thisYear = [];
    let thisMonth = [];
    let thisWeek = [];
    // go through every day of the year
    for (let d = 1; d <= 366; d++) {
      let day = moment().year(year).dayOfYear(d);
      // check if it's a weekday
      if ( day.day() > 0 && day.day() < 6) {
        let thisDay = {
          id: moment(day).format('YYYYMMDD'),
          year: moment(day).format('YYYY'),
          week: moment(day).week(),
          month: moment(day).format('MMM'),
          date: moment(day).format('D'),
          day: moment(day).format('ddd')
        };
        // add the day to the year array
        thisYear.push(thisDay);
        // if it's the same month as today, add it to the month array
        if ( moment(day).month() === moment().month() ) {
          thisMonth.push(thisDay);
        }
        // if it's the same week as today, add it to the week array
        if ( moment(day).week() === moment().week() ) {
          thisWeek.push(thisDay);
        }
      } // end if
    } // end for
    this.setState({
      thisYear: thisYear,
      thisMonth: thisMonth,
      thisWeek: thisWeek
    });
  }

  componentDidMount() {
    const now = moment();
    this.setState({
      now: now.format(),
      today: now.format('ddd, MMM D, YYYY')
    });
    this.buildYear(2019);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Moment.js test</h1>
        </header>
        <main>
          <h2>Now: {this.state.now}</h2>
          <h3>Today: {this.state.today}</h3>
          <h3>This Week:</h3>
          <pre>{JSON.stringify(this.state.thisWeek, null, 2)}</pre>
          <h3>This Month:</h3>
          <pre>{JSON.stringify(this.state.thisMonth, null, 2)}</pre>
          <h3>This Year:</h3>
          <pre>{JSON.stringify(this.state.thisYear, null, 2)}</pre>
        </main>
      </div>
    );  
  }
}

export default App;
