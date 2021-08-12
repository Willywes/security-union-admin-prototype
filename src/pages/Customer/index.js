import React, {useState} from 'react';
import MetaTags from "react-meta-tags";
import {Container} from "reactstrap";
import TableCustomer from "./TableCustomer";
import CreateCustomer from "./CreateCustomer";

const Customer = () => {

    const [section, setSection] = useState('table');

    const [customers, setCustomers] = useState([]);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Dashboard | Innovaweb</title>
                </MetaTags>
                <Container fluid>
                    {
                        section == 'table' ? <TableCustomer customers={customers} setSection={setSection}/> : null
                    }

                    {
                        section == 'create' ? <CreateCustomer customers={customers} setCustomers={setCustomers} setSection={setSection} /> : null
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
