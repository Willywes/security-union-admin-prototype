import React from 'react';
import {Link} from "react-router-dom";

const TableCustomer = ({customers, setSection, destroy}) => {

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
                                            <th>NOMBRE EMPRESA</th>
                                            <th>DIRECCIÓN</th>
                                            <th>NOMBRE CONTACTO</th>
                                            <th>EMAIL CONTACTO</th>
                                            <th>TELÉFONO CONTACTO</th>
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
                                                    <td>{customer.contact_name}</td>
                                                    <td>{customer.contact_email}</td>
                                                    <td>{customer.contact_phone}</td>
                                                    <td style={{ width : '1%'}}>
                                                        <div className="btn-group" role="group">
                                                            <Link to={`/clientes/${customer.id}`} style={{width: '35px'}}
                                                                    className="btn btn-sm btn-outline-primary">
                                                                <i className="fa fa-eye"/>
                                                            </Link>
                                                            <button type="button" onClick={() => destroy(customer.id)} style={{width: '35px'}}
                                                                    className="btn btn-sm btn-outline-danger">
                                                                <i className="fa fa-trash"/>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })
                                        }

                                        </tbody>
                                    </table>
                                    :
                                    <div className="alert alert-info text-center">
                                        <p className="mb-0">No existen clientes</p>
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