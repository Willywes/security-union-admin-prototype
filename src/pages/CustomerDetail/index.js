import React, {useEffect, useState} from 'react';
import MetaTags from "react-meta-tags";
import {Container} from "reactstrap";
import {useParams} from "react-router-dom";
import CardCustomer from "./CardCustomer";
import Menu from "./Menu";
import LogisticCenters from "./sections/LogisticCenters";

const CustomerDetail = () => {

    const [section, setSection] = useState('logistic_centers');
    const [customer, setCustomer] = useState(null);

    let {customer_id} = useParams();

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('customers'));
        const _customer = list.find(c => c.id == customer_id)
        setCustomer(_customer)
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Detalle de Cliente | Innovaweb</title>
                </MetaTags>
                <Container fluid>
                    <CardCustomer customer={customer} setCustomer={setCustomer}/>
                    <Menu section={section} setSection={setSection} customer={customer} setCustomer={setCustomer}/>
                    {
                        section == 'logistic_centers' && customer ?
                            <LogisticCenters customer={customer} setCustomer={setCustomer}/> : null
                    }
                </Container>
            </div>
        </React.Fragment>

    );
};

export default CustomerDetail
