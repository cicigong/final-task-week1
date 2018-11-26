import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';


class Customerlist extends Component {
    constructor(params) {
        super(params);
        this.state = {customers: [], customerId: []};
    }


    componentDidMount() {
      this.loadCustomers();
     } 

  

     loadCustomers() {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(resData => {
        this.setState({customers: resData.content});
        resData.content.forEach((row) => 
              this.setState({customerId: [...this.state.customerId, row.links[0].href.substr(49)]})
            
        );
      })  

     }

     
    render() {
        
        return (
            <div>
              <ReactTable
                data = {this.state.customers}
                columns = {[
                  {
                     Header: 'Id',
                     accessor: (row) => {
                     return row.links[0].href.substr(49)
                          },
                     id: 'id'    
                   
                  }
                  ,{
                    Header: 'Firstname',
                    accessor: 'firstname', 
                    
                  }, {
                    Header: 'Lastname',
                    accessor: 'lastname',
                    
                  }, {
                    Header: 'Streetaddress',
                    accessor: 'streetaddress',
                    
                  }, {
                    Header: 'Postcode',
                    accessor: 'postcode',
                   
                  }, {
                    Header: 'City',
                    accessor: 'city',
                   
                  }, {
                    Header: 'Email',
                    accessor: 'email',
                   
                  }, {
                    Header: 'Phone',
                    accessor: 'phone',
                   
                  }]}

                  defaultSorted={[
                    {
                      id: "links[0].href",
                      desc: false
                    }
                  ]}
                
                defaultPageSize={10}
                className="-striped -highlight"
                filterable={true}
                />
                
            </div>
        );
    }
}

export default Customerlist;