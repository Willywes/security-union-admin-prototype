import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from "uuid";
import {button} from "react-bootstrap-sweetalert/dist/styles/SweetAlertStyles";

const LogisticCenters = ({customer, setCustomer}) => {

    const defaultLogisticCenter = {
        id: uuidv4(),
        name: '',
        address: '',
    }

    const [selected, setSelected] = useState({id: '-1'})
    const [logisticCenters, setLogisticCenters] = useState([])
    const [logisticCenter, setLogisticCenter] = useState(defaultLogisticCenter);
    const [newLogisticCenter, setNewLogisticCenter] = useState(false)


    useEffect(() => {
        if (customer.logistic_centers) {
            setLogisticCenters(customer.logistic_centers)
            setSelected(customer.logistic_centers[0])
        }
    }, [customer])


    const handleLogisticCenter = (e) => {
        setLogisticCenter({
            ...logisticCenter,
            [e.target.name]: e.target.value
        })
    }

    const storeLogisticCenter = () =>{
        setTimeout(() =>{
            setLogisticCenters([...logisticCenters, setLogisticCenter])

            let _customer = customer;
            _customer['logistic_centers'] = [...logisticCenters, setLogisticCenter];
            console.log('_customer', _customer);

            let list = JSON.parse(localStorage.getItem('customers'));
            const indexCustomer = list.findIndex(c => c.id == customer.id)
            list[indexCustomer] = _customer

            localStorage.setItem('customers', JSON.stringify(list));

            setCustomer(_customer)

            setLogisticCenter(defaultLogisticCenter)

        }, 500)
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3">
                                {
                                    logisticCenters.map((lc) => {
                                        return <button key={lc.id}
                                                       className={`btn btn-${lc.id == 1 ? 'outline-' : ''}primary btn-block mb-1 text-uppercase`}>
                                            {lc.name}
                                        </button>
                                    })
                                }
                            </div>
                            <div className="col-9">

                                {
                                    newLogisticCenter ?
                                        <div className="row">
                                            <div className="col-5">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Nombre Empresa</label>
                                                    <input type="text" id="name" name="name" value={logisticCenter.name}
                                                           onChange={handleLogisticCenter}
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col-5">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="address">Dirección</label>
                                                    <input type="text" id="address" name="address" value={logisticCenter.address}
                                                           onChange={handleLogisticCenter}
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <button onClick={storeLogisticCenter} className="btn btn-primary btn-block mt-4">
                                                    <i className="fa fa-save" /> Guardar
                                                </button>
                                            </div>
                                        </div> :
                                        <div className="col">
                                            <button onClick={() => setNewLogisticCenter(true)} className="btn btn-primary btn-block mt-4">
                                                <i className="fa fa-plus" /> Nuevo Centro Logístico
                                            </button>
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogisticCenters
