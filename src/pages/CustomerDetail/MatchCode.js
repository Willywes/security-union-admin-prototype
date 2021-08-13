import React, {Fragment, useEffect, useState} from 'react';
import toastr from "toastr";

const CardCustomer = ({customer}) => {

    const [sending, setSending] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [localCustomer, setLocalCustomer] = useState(null);

    useEffect(() => {
        if (customer) {
            setLocalCustomer(customer)
        }
    }, [customer])

    const handleCustomer = (e) => {
        setLocalCustomer({
            ...localCustomer,
            [e.target.name]: e.target.value
        })
    }

    const reset = () => {
        setLocalCustomer(customer)
        setDisabled(true)
    }

    const store = () => {
        setSending(true)
        setTimeout(() => {

            let list = JSON.parse(localStorage.getItem('customers'));
            const indexCustomer = list.findIndex(c => c.id == customer.id)
            list[indexCustomer] = localCustomer
            localStorage.setItem('customers', JSON.stringify(list));
            toastr.success('Cliente actualizado correctamente.')
            setSending(false)
            setDisabled(true)
        }, 500)
    }

    if (!localCustomer) return null;

    return (
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col">
                                <h2 className="card-title">
                                    Cliente
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Nombre Empresa</label>
                                    <input type="text" id="name" name="name" value={localCustomer.name}
                                           onChange={handleCustomer}
                                           disabled={disabled}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="address">Dirección</label>
                                    <input type="text" id="address" name="address" value={localCustomer.address}
                                           onChange={handleCustomer}
                                           disabled={disabled}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label htmlFor="region">Región</label>
                                    <select id="region" name="region" value={localCustomer.region}
                                            onChange={handleCustomer}
                                            disabled={disabled}
                                            className="form-control">
                                        <option value="Región 1">Región 1</option>
                                        <option value="Región 2">Región 2</option>
                                        <option value="Región 3">Región 3</option>
                                        <option value="Región 4">Región 4</option>
                                        <option value="Región 5">Región 5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label htmlFor="commune">Comuna</label>
                                    <select id="commune" name="commune" value={localCustomer.commune}
                                            onChange={handleCustomer}
                                            disabled={disabled}
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
                                           value={localCustomer.contact_name}
                                           onChange={handleCustomer}
                                           disabled={disabled}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label htmlFor="contact_email">Email Contacto</label>
                                    <input type="text" id="contact_email" name="contact_email"
                                           value={localCustomer.contact_email}
                                           onChange={handleCustomer}
                                           disabled={disabled}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label htmlFor="contact_phone">Teléfono Contacto</label>
                                    <input type="text" id="contact_phone" name="contact_phone"
                                           value={localCustomer.contact_phone}
                                           onChange={handleCustomer}
                                           disabled={disabled}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-12 mt-3 text-right">
                                <div className="row mb-3">
                                    <div className="col">
                                        {
                                            !disabled ? <button className="btn btn-secondary" onClick={reset}>
                                                <i className="fa fa-times"/> Cancelar
                                            </button> : null
                                        }
                                    </div>
                                    <div className="col-auto text-right">

                                        {
                                            !disabled ?
                                                <Fragment>
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
                                                </Fragment> :
                                                <button className="btn btn-primary" onClick={() => setDisabled(false)}>
                                                    <i className="fa fa-edit"/> Editar
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

export default CardCustomer
