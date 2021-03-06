import React, {Fragment, useEffect, useState} from 'react';
import toastr from "toastr";

const CardCustomer = ({customer, setCustomer}) => {

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
            setCustomer(localCustomer)
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
                    <div className="h5 bg-transparent border-bottom text-uppercase card-header">
                        Cliente {localCustomer.name}

                    </div>
                    <div className="card-body">

                        {disabled ?
                            <div className="row">
                                <div className="col-12">
                                    <table className="table table-bordered mb-0">
                                        <thead>
                                        <tr>
                                            {/*<th>ID</th>*/}
                                            <th>NOMBRE EMPRESA</th>
                                            <th>DIRECCI??N</th>
                                            <th>NOMBRE CONTACTO</th>
                                            <th>EMAIL CONTACTO</th>
                                            <th>TEL??FONO CONTACTO</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{customer.name}</td>
                                            <td>{customer.address}</td>
                                            <td>{customer.contact_name}</td>
                                            <td>{customer.contact_email}</td>
                                            <td>{customer.contact_phone}</td>
                                            <td style={{width : '1%'}}>
                                                <button className="btn btn-sm btn-outline-warning" onClick={() => setDisabled(false)}>
                                                    <i className="fa fa-edit"/>
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> :
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
                                        <label htmlFor="address">Direcci??n</label>
                                        <input type="text" id="address" name="address" value={localCustomer.address}
                                               onChange={handleCustomer}
                                               disabled={disabled}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group mb-3">
                                        <label htmlFor="region">Regi??n</label>
                                        <select id="region" name="region" value={localCustomer.region}
                                                onChange={handleCustomer}
                                                disabled={disabled}
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
                                        <label htmlFor="contact_phone">Tel??fono Contacto</label>
                                        <input type="text" id="contact_phone" name="contact_phone"
                                               value={localCustomer.contact_phone}
                                               onChange={handleCustomer}
                                               disabled={disabled}
                                               className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="row mt-3">
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
                                        </Fragment> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCustomer
