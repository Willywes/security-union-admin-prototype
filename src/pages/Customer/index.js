import React, {useEffect, useState} from 'react';
import MetaTags from "react-meta-tags";
import {Container} from "reactstrap";
import TableCustomer from "./TableCustomer";
import CreateCustomer from "./CreateCustomer";
import SweetAlert from "sweetalert2";

const Customer = () => {

    const [section, setSection] = useState('table');
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        setCustomers(JSON.parse(localStorage.getItem('customers')));
    }, [])

    useEffect(() => {
        if (customers) {
            localStorage.setItem('customers', JSON.stringify(customers));
        }
    }, [customers])

    const destroy = (id) => {
        SweetAlert.fire({
            title: '¿Estas seguro?',
            html: 'Si eliminas este registrar, la información será irrecuperable.',
            icon: 'warning',
            imageSize: '120x120',
            showCancelButton: true,
            confirmButtonColor: '#92c755',
            cancelButtonColor: '#f22314 ',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: false,

        }).then((result) => {
            if (result.value) {
                setTimeout(() => {
                    let list = customers.filter(c => c.id !== id)
                    console.log(list);
                    setCustomers(list)
                }, 500)
            }
        })
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Clientes | Innovaweb</title>
                </MetaTags>
                <Container fluid>
                    {
                        section == 'table' ?
                            <TableCustomer customers={customers} setSection={setSection} destroy={destroy}/> : null
                    }

                    {
                        section == 'create' ? <CreateCustomer customers={customers} setCustomers={setCustomers}
                                                              setSection={setSection}/> : null
                    }


                    {/*<div className="row">*/}
                    {/*    <div className="col-12">*/}
                    {/*        <div className="card">*/}
                    {/*            <div className="card-body">*/}

                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </Container>
            </div>
        </React.Fragment>

    );
};

export default Customer
