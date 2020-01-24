import React, { Component } from 'react';
import './app.css';
import ReactTable from 'react-table-6';
import {dataPrepare} from './util';
import allocatAndReports from '../server/process' 
import 'react-table-6/react-table.css'
import axios from 'axios'

export default class App extends Component {
  state = {
    username: null,
    inputValue: '',
    tableData : {}
  };

  componentDidMount() {
    this.setState({
      tableData: dataPrepare()
    })

    fetch('/butler-response')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
      console.log(dataPrepare())
      

  }
  // submitHandler = () => {
  //   if (this.state.inputValue) {
  //     console.log(this.state.inputValue)

  //     const requestObj = this.state.inputValue;
  //     console.log(requestObj)

  //     axios.post('/api/client-request', requestObj)
  //           .then(response=>{
  //               return response.data
  //           })
  //           .then(data=>{
  //               console.log('----------')
  //               console.log(data)
  //               console.log('----------')
  //           })
  //   }
  // }

  submitHandler = () => {
    if (this.state.inputValue) {
      console.log(this.state.inputValue)

      const requestObj = this.state.inputValue;
      console.log(requestObj)
      allocatAndReports(requestObj);


      // axios.post('/api/client-request', requestObj)
      //       .then(response=>{
      //           return response.data
      //       })
      //       .then(data=>{
      //           console.log('----------')
      //           console.log(data)
      //           console.log('----------')
      //       })
    }
  }

  headerComponent =()=> {
    return <span></span>
  }

  render() {
    const { username} = this.state;
    const {headers, butlers, newData} = this.state.tableData;
    console.log(this.state.tableData)
    headers && headers.map(head=>{
      console.log(head)
      butlers.map(bt=>{
          bt.requests.map(req=>{
             const clObj = newData[req]
              if(clObj.clientId==head) {
                  console.log(clObj.hours)
              }
          })
      })
  })
    return (
      <div className='inputBox'>
        <div>
          <textarea type='input' cols='6' value={this.state.inputValue} onChange={(event) => { this.setState({ inputValue: event.target.value }) }} />
        </div>
        <div>
          <button onClick={this.submitHandler}>
            Submit
        </button>
        </div>

        <div>
        <table className="table">
    <thead>
      <tr>
       {
         headers && headers.map(head=>{
          console.log(head)
         return <th key={head}>{head}</th>
      })
       }
      </tr>
    </thead>
    <tbody>
      
        {
         headers && headers.map(head=>{
           return butlers.map(bt=>{
             
           let demo =  bt.requests.map(req=>{
                   const clObj = newData[req]
                   console.log(clObj)
                  //  return <tr><td>w</td></tr>
                   if(clObj.clientId==head) {
                      console.log(clObj)
                   return <td>{clObj.hours}</td>
                    }
                })
                
                return demo;
                console.log(demo)
            })
        })
        }
    </tbody>
  </table>
        </div>
      </div>
    );
  }
}
