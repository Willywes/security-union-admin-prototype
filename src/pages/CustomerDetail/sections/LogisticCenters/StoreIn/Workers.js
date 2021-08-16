import React, {useEffect, useState} from 'react';
import {button} from "react-bootstrap-sweetalert/dist/styles/SweetAlertStyles";
import {v4 as uuidv4} from "uuid";
import toastr from "toastr";

const Workers = ({logisticCenter, section, setSection}) => {

    if (!logisticCenter) {
        return null;
    }

    const workerDefault = {
        id: uuidv4(),
        first_name: '',
        last_name : '',
        email : '',
        phone : '',
        logistic_center_id: logisticCenter.id,
    }

    const [workers, setWorkers] = useState([]);
    const [worker, setWorker] = useState(workerDefault);

    useEffect(() => {
        if (logisticCenter) {
            let list = JSON.parse(localStorage.getItem('workers'));
            if (list) {
                let filtered = list.filter(f => f.logistic_center_id == logisticCenter.id);
                setWorkers(filtered)
            }
        }
    }, [logisticCenter])

    const handleWorkers = (e) => {
        setWorker({
            ...worker,
            [e.target.name]: e.target.value
        })
    }

    const store = () => {
        if (
            worker.first_name == '' ||
            worker.last_name == ''
        ) {
            toastr.warning('Complete todos los campos.')
            return null;
        }
        const _workers = [...workers, worker];

        setWorkers(_workers)
        setWorker(workerDefault)

        let list = JSON.parse(localStorage.getItem('workers'));
        let filtered = list ? list.filter(f => f.logistic_center_id != logisticCenter.id) : [];
        localStorage.setItem('workers', JSON.stringify([...filtered, ..._workers]));
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col d-flex">
                        <div className="h5 text-uppercase my-auto">
                            TRABAJADORES
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="button-items">

                            <button
                                style={{width: '150px'}}
                                className={`btn btn-${section != 'warehouses' ? 'outline-' : ''}primary`}
                                onClick={() => setSection('warehouses')}>
                                BODEGAS
                            </button>

                            <button
                                style={{width: '150px'}}
                                className={`btn btn-${section != 'workers' ? 'outline-' : ''}primary`}
                                onClick={() => setSection('workers')}>
                                TRABAJADORES
                            </button>



                        </div>
                    </div>
                    <div className="col-12">
                        <hr/>
                    </div>
                </div>
                <div className="row">

                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="first_name">Nombres</label>
                            <input type="text" id="first_name" name="first_name" value={worker.first_name}
                                   onChange={handleWorkers}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="last_name">Apellidos</label>
                            <input type="text" id="last_name" name="last_name" value={worker.last_name}
                                   onChange={handleWorkers}
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="email">E-Mail</label>
                            <input type="text" id="email" name="email" value={worker.email}
                                   onChange={handleWorkers}
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="phone">Teléfono</label>
                            <input type="text" id="phone" name="phone" value={worker.phone}
                                   onChange={handleWorkers}
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="col-auto" style={{paddingTop: '3px'}}>
                        <div className="button-items">
                            <button onClick={store}
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
                                <th>NOMBRES</th>
                                <th>APELLIDOS</th>
                                <th>EMAIL</th>
                                <th>TElÉFONO</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                workers.map((d) =>{
                                    return <tr key={d.id}>
                                        <td>{d.first_name}</td>
                                        <td>{d.last_name}</td>
                                        <td>{d.email ? d.email : '-'}</td>
                                        <td>{d.phone ? d.phone : '-'}</td>
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

export default Workers
