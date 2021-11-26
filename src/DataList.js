
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';



const products = [
    { id: 1, name: "Item 1", price: 100 },
    { id: 2, name: "Item 2", price: 102 }
];

function DataList() {
    const [countries, setCountries] = useState([]);

    const columns = [
        { dataField: 'name', text: 'Name', sort: true },
        { dataField: 'capital', text: 'Capital', sort: true,filter:textFilter()},
        { dataField: 'region', text: 'Region', sort: true },
        {
            dataField: 'flag',
            text: 'Flag',
            formatter: (cell, row) => (
                <img alt={row.name} style={{ maxWidth: "25%" }} src={row.flag} />
            )
        }

    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizPerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizPerPage', sizePerPage);
        }
    });

    useEffect(() => {

        axios
            .get('https://restcountries.com/v2/all')
            .then(response => setCountries(response.data));

    }, [])

    return (
        <div>
            {countries !== [] ? (
                <BootstrapTable bootstrap4
                    keyField='name'
                    columns={columns}
                    data={countries}
                    pagination={pagination}
                    filter={filterFactory()}
                    // filter={countries.length > 0 ? filterFactory() : false}
                />
            ) : (
                <div>Yükleniyor</div>
            )}
        </div>
    );
}

export default DataList;






