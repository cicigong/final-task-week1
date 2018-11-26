import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import * as moment from 'moment';

class Trainings extends Component {
    constructor(props) {
        super(props);
        this.state = {trainings: [], trainingId: [], customer: {}};
        //console.log(this.state)
    }

    componentDidMount() {
         this.loadTraining();
       } 
    loadTraining () {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(res => res.json())
        .then(resData => {
        this.setState({trainings: resData.content});
        resData.content.forEach((row) => {
              //console.log(row)
              this.setState({trainingId: [...this.state.trainingId, row.links[0].href.substr(49)]})
              // fetch again to the right data to get trainingId and customerId
              fetch (row.links[2].href)
              .then(res => res.json())
              .then(resData => {
                const trainingId = row.links[0].href.substr(49)
                const customerId = resData.links[0].href.substr(49)
                //console.log(trainingId, customerId)
                this.setState({
                  customer: {...this.state.customer, [trainingId]: customerId}
                })
                //console.log(this.state.customer)

              })
            
        });
      })  

    }

    render() {
        
        return (
            <div>
              <ReactTable
                data = {this.state.trainings}
                columns = {[
                  {
                    columns: [
                      {
                          Header: 'Id',
                          accessor: (row) => {
                              return row.links[0].href.substr(49)
                          },
                          id: 'id' 
                        }
                      
                    ]
                  }
                  
                  
                  ,{
                    
                      Header: 'Date',
                
                     
                      accessor: (row) => {
                         return moment(row.date).format('YYYY-M-D')
                      },
                      id: 'date'
                      
                          
                    }, {
                      Header: 'Duration',
                      accessor: 'duration',
                      
                    }, {
                      Header: 'Activity',
                      accessor: 'activity',
                      
                    }, {
                      Header: 'Customer',
                      accessor: (row) => {
                        // get the trainingId first 
                        const trainingId =  row.links[0].href.substr(49)
                        // go inside cusomer object and through trainingId to get customerId
                        return this.state.customer[trainingId]  
                     
                      },
                      id: 'customer'
                     
                    }]}

                defaultPageSize={10}
                className="-striped -highlight"
                filterable={true}
              
              
              />
            </div>
        );
    }
}

export default Trainings;