import React, {useEffect, useState} from 'react';
import MetaTags from "react-meta-tags";
import {Container} from "reactstrap";
import {useParams} from "react-router-dom";

const CustomerDetail = () => {

    const [section, setSection] = useState('init');
    const [customer, setCustomer] = useState({id: ''});

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
                    <title>Dashboard | Innovaweb</title>
                </MetaTags>
                <Container fluid>

                    Pijas {customer.name}

                </Container>
            </div>
        </React.Fragment>

    );
};

export default CustomerDetail
