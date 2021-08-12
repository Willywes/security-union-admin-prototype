import React from 'react';

const TableCustomer = ({customers, setSection}) => {

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col">
                                <h2 className="card-title">
                                    Clientes
                                </h2>
                            </div>
                            <div className="col-auto text-right">
                                <button className="btn btn-primary" onClick={() => setSection('create')}><i
                                    className="fa fa-plus"/> Nuevo Cliente
                                </button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            {
                                customers.length ?
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            {/*<th>ID</th>*/}
                                            <th>NOMBRE</th>
                                            <th>DIRECCIÓN</th>
                                            <th>TELÉFONO</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            customers.map((customer, index) => {
                                                return <tr key={index}>
                                                    {/*<td>{customer.id}</td>*/}
                                                    <td>{customer.name}</td>
                                                    <td>{customer.address}</td>
                                                    <td>{customer.phone}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary"><i
                                                            className="fa fa-eye"/></button>
                                                    </td>
                                                </tr>
                                            })
                                        }

                                        </tbody>
                                    </table>
                                    :
                                    <div className="alert alert-info">
                                        <h3>No existen clientes</h3>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableCustomer