import React, {useEffect, useState} from 'react';
import {button} from "react-bootstrap-sweetalert/dist/styles/SweetAlertStyles";
import {v4 as uuidv4} from "uuid";
import toastr from "toastr";

const Devices = ({logisticCenter}) => {

    if (!logisticCenter) {
        return null;
    }

    const deviceDefault = {
        id: uuidv4(),
        brand: '',
        model: '',
        serie: '',
        logistic_center_id: logisticCenter.id,
        phone: ''
    }

    const [devices, setDevices] = useState([]);
    const [device, setDevice] = useState(deviceDefault);

    useEffect(() => {
        if (logisticCenter) {
            let list = JSON.parse(localStorage.getItem('devices'));
            if (list) {
                let filtered = list.filter(f => f.logistic_center_id == logisticCenter.id);
                setDevices(filtered)
            }

        }
    }, [logisticCenter])

    const handleDevices = (e) => {
        setDevice({
            ...device,
            [e.target.name]: e.target.value
        })
    }

    const storeDevice = () => {
        if (
            device.brand == '' ||
            device.model == '' ||
            device.serie == '' ||
            device.phone == ''
        ) {
            toastr.warning('Complete todos los campos.')
            return null;
        }

        setDevices([...devices, device])
        setDevice(deviceDefault)
        let list = JSON.parse(localStorage.getItem('devices'));
        let filtered = list ? list.filter(f => f.logistic_center_id !== logisticCenter.id) : [];
        localStorage.setItem('devices', JSON.stringify([...filtered, ...devices]));
    }


    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col d-flex">
                        <div className="h5 text-uppercase my-auto">
                            Dispositivos
                        </div>
                    </div>
                    <div className="col-12">
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="brand">Marca</label>
                            <input type="text" id="brand" name="brand" value={device.brand}
                                   onChange={handleDevices}
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="model">Modelo</label>
                            <input type="text" id="model" name="model" value={device.model}
                                   onChange={handleDevices}
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="serie">Nº Serie</label>
                            <input type="text" id="serie" name="serie" value={device.serie}
                                   onChange={handleDevices}
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="phone">Nº Teléfono</label>
                            <input type="text" id="phone" name="phone" value={device.phone}
                                   onChange={handleDevices}
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="col-auto" style={{paddingTop: '3px'}}>
                        <div className="button-items">
                            <button onClick={storeDevice}
                                    className="btn btn-primary btn-block mt-4">
                                <i className="fa fa-save"/> Agregar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>MARCA</th>
                                <th>MODELO</th>
                                <th>Nº SERIE</th>
                                <th>Nº TELÉFONO</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                devices.map((d) =>{
                                    return <tr key={d.id}>
                                        <td>{d.brand}</td>
                                        <td>{d.model}</td>
                                        <td>{d.serie}</td>
                                        <td>{d.phone}</td>
                                        <td></td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Devices
