import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from "uuid";
import {button} from "react-bootstrap-sweetalert/dist/styles/SweetAlertStyles";
import toastr from "toastr";
import StoreIn from "./StoreIn";
import Routes from "./Routes";
import Devices from "./Devices";

const LogisticCenters = ({customer, setCustomer}) => {

    const defaultLogisticCenter = {
        id: uuidv4(),
        name: '',
        address: '',
        customer_id: customer.id
    }

    const [selected, setSelected] = useState(null)
    const [logisticCenters, setLogisticCenters] = useState([])
    const [logisticCenter, setLogisticCenter] = useState(defaultLogisticCenter);
    const [newLogisticCenter, setNewLogisticCenter] = useState(false)
    const [logisticCenterSection, setLogisticCenterSection] = useState('devices');


    useEffect(() => {
        if (customer.logistic_centers.length > 0) {
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

    const storeLogisticCenter = () => {
        if (
            logisticCenter.name == '' ||
            logisticCenter.address == ''
        ) {
            toastr.warning('Complete todos los campos.')
            return null;
        }

        setTimeout(() => {
            setSelected(logisticCenter)
            setLogisticCenters([...logisticCenters, logisticCenter])
            let _customer = customer;
            _customer['logistic_centers'] = [...logisticCenters, logisticCenter];
            console.log('_customer', _customer);

            let list = JSON.parse(localStorage.getItem('customers'));
            const indexCustomer = list.findIndex(c => c.id == customer.id)
            list[indexCustomer] = _customer

            localStorage.setItem('customers', JSON.stringify(list));

            setCustomer(_customer)

            setLogisticCenter(defaultLogisticCenter)
            setNewLogisticCenter(false)

        }, 500)
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">

                                {
                                    newLogisticCenter ?
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Nombre Centro Logístico</label>
                                                    <input type="text" id="name" name="name" value={logisticCenter.name}
                                                           onChange={handleLogisticCenter}
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="address">Dirección</label>
                                                    <input type="text" id="address" name="address"
                                                           value={logisticCenter.address}
                                                           onChange={handleLogisticCenter}
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col-auto" style={{paddingTop: '3px'}}>
                                                <div className="button-items">
                                                    <button onClick={() => {
                                                        setLogisticCenter(defaultLogisticCenter)
                                                        setNewLogisticCenter(false)
                                                    }}
                                                            className="btn btn-secondary btn-block mt-4">
                                                        <i className="fa fa-times"/> Cancelar
                                                    </button>
                                                    <button onClick={storeLogisticCenter}
                                                            className="btn btn-primary btn-block mt-4">
                                                        <i className="fa fa-save"/> Guardar
                                                    </button>
                                                </div>
                                            </div>
                                        </div> :
                                        <button onClick={() => setNewLogisticCenter(true)}
                                                className="btn btn-primary btn-block">
                                            <i className="fa fa-plus"/> Nuevo Centro Logístico
                                        </button>
                                }

                                <hr/>

                            </div>
                            <div className="col-3">
                                <div className="row">
                                    {
                                        logisticCenters.map((lc) => {
                                            return <div className="col-12 mb-1" key={lc.id}>
                                                <button
                                                    onClick={() => {
                                                        setSelected(lc)
                                                        setLogisticCenterSection('devices')
                                                    }}
                                                    className={`w-100 text-start btn btn-${lc.id !== selected.id ? 'outline-' : ''}primary btn-block mb-1`}>
                                                    <div className="row">
                                                        <div className="col-12 text-uppercase">
                                                            {lc.name}
                                                        </div>
                                                        <div className="col-12 font-size-10">
                                                            {lc.address}
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-9">
                                {
                                    selected ?
                                        <div className="row">
                                            <div className="col d-flex">
                                                <div className="h5 text-uppercase my-auto">
                                                    Centro Logístico {selected.name}
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="button-items">
                                                    <button
                                                        style={{width: '150px'}}
                                                        className={`btn btn-${logisticCenterSection != 'devices' ? 'outline-' : ''}primary`}
                                                        onClick={() => setLogisticCenterSection('devices')}>
                                                        Devices
                                                    </button>

                                                    <button
                                                        style={{width: '150px'}}
                                                        className={`btn btn-${logisticCenterSection != 'store_in' ? 'outline-' : ''}primary`}
                                                        onClick={() => setLogisticCenterSection('store_in')}>
                                                        Store In
                                                    </button>

                                                    <button
                                                        style={{width: '150px'}}
                                                        className={`btn btn-${logisticCenterSection != 'routes' ? 'outline-' : ''}primary`}
                                                        onClick={() => setLogisticCenterSection('routes')}>
                                                        Rutas
                                                    </button>


                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <hr/>
                                            </div>
                                        </div> : null
                                }
                                {
                                    logisticCenterSection == 'devices' ? <Devices logisticCenter={selected} /> : null
                                }

                                {
                                    logisticCenterSection == 'store_in' ? <StoreIn logisticCenter={selected} /> : null
                                }

                                {
                                    logisticCenterSection == 'routes' ? <Routes logisticCenter={selected} /> : null
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
