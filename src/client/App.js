import React, { Component } from 'react';
import './app.css';
import ReactTable from 'react-table-6';
import {dataPrepare} from './util';
import 'react-table-6/react-table.css'
import axios from 'axios'

export default class App extends Component {
  state = {
    username: null,
    inputValue: '',
    tableData : [],
    response: [],
  };

  submitHandler = () => {
    if (this.state.inputValue) {

      const requestObj = this.state.inputValue;
      try {
        let obj = JSON.parse(requestObj.replace(/\r?\n|\r/g, ''),'')
        const demo = {'req': obj}
        let data = {data: demo.req.exampleRequests};
        axios.post('/api/client-request', data)
              .then(response=>{
                  return response.data
              })
              .then(response=>{
                  const butlersReq = [...response.data];
                  const columns = [{
                    Header: 'Butlers / request',
                    accessor: 'name'
                  }];
                  butlersReq.map((item, index) => {
                    let total = 0;
                    if(item.requests) {
                      item.requests.map(req => {
                        const reqData = data.data.filter(option => option.requestId === req);
                      if(reqData) {
                        item[req] = reqData[0].hours;
                        total += reqData[0].hours;
                      }
                      return null;
                      });
                    }
                    console.log('total', total);
                    item.name = `B${index + 1}`
                    item.total = total;
                    return null;
                  });
                  data.data.map(item => {
                    columns.push({
                      Header: item.requestId,
                      accessor: item.requestId,
                      Cell: props => <span className={`rows`}>{props.value}</span>
                    });
                  });
                  this.setState({
                    tableData: butlersReq,
                    columns,
                  });
              })
      } catch (error) {
        return null;
      }
    }
  }

  headerComponent =()=> {
    return <span></span>
  }

  getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      console.log('rowInfo', rowInfo);
      return {
        style: {
          background: rowInfo.row._original.total >= 8 ? 'green' : rowInfo.row._original.total >=6 ? 'orange' : 'red',
          color: 'white'
        }
      }
    }
    return {};
  }

  render() {
    const { tableData, columns } = this.state;
    return (
      <div className='inputBox'>
        <div>
          {/* <input type='file' onChange={(event) => { this.setState({ inputValue: event.target.value }) }} value={this.state.inputValue}/> */}
          <textarea type='input' cols='6' value={this.state.inputValue} onChange={(event) => { this.setState({ inputValue: event.target.value }) }} />
        </div>
        <div>
          <button onClick={this.submitHandler}>
            Submit
        </button>
        </div>

        <div>
        </div>
        {tableData.length > 0 && <ReactTable
          data={tableData}
          columns={columns}
          defaultPageSize={10}
          getTrProps={this.getTrProps}
        />}
      </div>
    );
  }
}
