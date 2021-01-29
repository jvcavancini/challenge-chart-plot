import React from 'react';
import Highcharts, { find } from 'highcharts';
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
    let foo=[]
    let final_data=[]
    //making json
    this.state.textAreaValue.split('\n').forEach(data=>{
      //transform unformatted string in formatted string
      foo.push(((((data.replaceAll('\'','"')).replaceAll('{','{"')).replaceAll(':','":')).replaceAll(', ',', "')).replaceAll('""','"'))
    })
    const json_full=foo.map(JSON.parse)
    //getting categories and filtering timestamp
    const json_group = (json_full.find(data=>{return data.type=='start'}))?.group
    const json_select = (json_full.find(data=>{return data.type=='start'}))?.select
    const begin = (json_full.find(data=>{return data.type=='span'}))?.begin
    const end = (json_full.find(data=>{return data.type=='span'}))?.end
    const json_data = (json_full.filter(data=>{return data.type=='data' && data.timestamp>=begin && data.timestamp<=end}))
    //rearranging data
    json_data.forEach(data=>{
      for(let i=0;i<json_select.lenght;++i) {
        let temporary_data={}
        temporary_data.data={x:data.timestamp,y:data[json_select[i]]}
        json_group.forEach(g=>{temporary_data[g]=data[g]})
        temporary_data.select=json_select[i]
        final_data.push(temporary_data)
      }
    })
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
