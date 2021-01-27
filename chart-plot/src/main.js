import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2010
    }
  },
  series: [{
      name: 'teste1',
      data: [1, 2, 1, 4, 3, 6]
    },{
      name: 'teste2',
      data:[2,3,2,3,2,7]
    }]
};

class First_page extends React.Component {
constructor() {
    super();
    this.state = {
      textAreaValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonclick = this.buttonclick.bind(this);
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value })
  }

  buttonclick() {
    console.log(this.state.textAreaValue)
    //transformar os dados e salvar em variavel aqui
  };

  render() {
    const datainput_style = {
        margin: 0,
        backgroundColor: '#C0C0C0',
        fontFamily: "Source Sans Pro",
        width: "100%"
    };
    const header_style = {
        margin: 0,
        backgroundColor: "#F5F5F5",
        padding: "20px",
        fontFamily: "Source Sans Pro"
    };
    return (
      <div>
        <h1 style={header_style}>Joao's Challenge</h1>
        <textarea
        style={datainput_style}
        value={this.state.textAreaValue}
        onChange={this.handleChange}
        placeholder="Insert your data here"
        wrap="off"
        />
        <HighchartsReact highcharts={Highcharts} options={options} />
        <button onClick={this.buttonclick}>GENERATE CHART</button>
      </div>
    );
  }

}


export default First_page;
