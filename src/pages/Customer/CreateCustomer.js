import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const CreateCustomer = ({customers, setCustomers, setSection}) => {

    const initialCustomer = {
        id: uuidv4(),
        name: '',
        address: '',
        phone: ''
    }

    const [customer, setCustomer] = useState(initialCustomer);

    const handleCustomer = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        })
    }

    const store = () => {
        const newList = [...customers, customer]
        setCustomers(newList)
        reset()
    }

    const reset = () => {
        setCustomer(initialCustomer)
        setSection('table')
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col">
                                <h2 className="card-title">
                                    Crear Cliente
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Nombre</label>
                                    <input type="text" id="name" name="name" value={customer.name} onChange={handleCustomer}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <label htmlFor="address">Dirección</label>
                                    <input type="text" id="address" name="address" value={customer.address}
                                           onChange={handleCustomer}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <label htmlFor="phone">Fono</label>
                                    <input type="text" id="phone" name="phone" value={customer.phone}
                                           onChange={handleCustomer}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-12 mt-3 text-right">
                                <div className="row mb-3">
                                    <div className="col">
                                        <button className="btn btn-secondary" onClick={reset}>
                                            <i className="fa fa-times"/> Cancelar
                                        </button>
                                    </div>
                                    <div className="col-auto text-right">
                                        <button className="btn btn-primary"
                                                onClick={store}>
                                            <i className="fa fa-save"/> Guardar
                                        </button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCustomer
