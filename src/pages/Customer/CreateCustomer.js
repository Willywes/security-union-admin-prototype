import React, {useState} from 'react';
import toastr from  'toastr'
import {v4 as uuidv4} from 'uuid';

const CreateCustomer = ({customers, setCustomers, setSection}) => {

    const initialCustomer = {
        id: uuidv4(),
        name: '',
        address: '',
        commune: '',
        region: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        has_store_in: false,
        has_routes: false,
        match_code : '',
        logistic_centers: [],
        routes: {}
    }

    const [customer, setCustomer] = useState(initialCustomer);
    const [sending, setSending] = useState(false);

    const handleCustomer = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        })
    }

    const store = () => {

        if(
            customer.name == '' ||
            customer.address == '' ||
            customer.contact_name == '' ||
            customer.contact_email == '' ||
            customer.contact_phone == ''
        ){
            toastr.warning('Complete todos los campos.')
            return null;
        }

        setSending(true)
        setTimeout(() => {
            setSending(false)
            const newList = [...customers, customer]
            setCustomers(newList)
            toastr.success('Cliente agregado correctamente.')
            reset()
        }, 500)
    }

    const reset = () => {
        setCustomer(initialCustomer)
        setSection('table')
    }

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <div className="card">
                    <div className="h5 bg-transparent border-bottom text-uppercase card-header">
                        Crear Cliente
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Nombre Empresa</label>
                                    <input type="text" id="name" name="name" value={customer.name}
                                           onChange={handleCustomer}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="address">Direcci??n</label>
                                    <input type="text" id="address" name="address" value={customer.address}
                                           onChange={handleCustomer}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label htmlFor="region">Regi??n</label>
                                    <select id="region" name="region" value={customer.region}
                                            onChange={handleCustomer}
                                            className="form-control">
                                        <option value="Regi??n 1">Regi??n 1</option>
                                        <option value="Regi??n 2">Regi??n 2</option>
                                        <option value="Regi??n 3">Regi??n 3</option>
                                        <option value="Regi??n 4">Regi??n 4</option>
                                        <option value="Regi??n 5">Regi??n 5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label htmlFor="commune">Comuna</label>
                                    <select id="commune" name="commune" value={customer.commune}
                                            onChange={handleCustomer}
                                            className="form-control">
                                        <option value="Comuna 1">Comuna 1</option>
                                        <option value="Comuna 2">Comuna 2</option>
                                        <option value="Comuna 3">Comuna 3</option>
                                        <option value="Comuna 4">Comuna 4</option>
                                        <option value="Comuna 5">Comuna 5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="contact_name">Nombre Contacto</label>
                                    <input type="text" id="contact_name" name="contact_name"
                                           value={customer.contact_name} onChange={handleCustomer}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label htmlFor="contact_email">Email Contacto</label>
                                    <input type="text" id="contact_email" name="contact_email"
                                           value={customer.contact_email}
                                           onChange={handleCustomer}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label htmlFor="contact_phone">Tel??fono Contacto</label>
                                    <input type="text" id="contact_phone" name="contact_phone"
                                           value={customer.contact_phone}
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

                                        {
                                            sending ?
                                                <button className="btn btn-primary disabled">
                                                    <i className="bx bx-loader bx-spin align-middle"/> Guardar
                                                </button> :
                                                <button className="btn btn-primary"
                                                        onClick={store}>
                                                    <i className="fa fa-save"/> Guardar
                                                </button>
                                        }
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
