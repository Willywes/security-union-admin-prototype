import React, {useEffect, useState} from 'react';
import {button} from "react-bootstrap-sweetalert/dist/styles/SweetAlertStyles";
import {v4 as uuidv4} from "uuid";
import toastr from "toastr";

const Warehouses = ({logisticCenter, section, setSection}) => {

    if (!logisticCenter) {
        return null;
    }

    const warehouseDefault = {
        id: uuidv4(),
        name: '',
        number : '',
        logistic_center_id: logisticCenter.id,
    }

    const [warehouses, setWarehouses] = useState([]);
    const [warehouse, setWarehouse] = useState(warehouseDefault);

    useEffect(() => {
        if (logisticCenter) {
            let list = JSON.parse(localStorage.getItem('warehouses'));
            if (list) {
                let filtered = list.filter(f => f.logistic_center_id == logisticCenter.id);
                setWarehouses(filtered)
            }
        }
    }, [logisticCenter])

    const handleWarehouses = (e) => {
        setWarehouse({
            ...warehouse,
            [e.target.name]: e.target.value
        })
    }

    const store = () => {
        if (
            warehouse.number == '' ||
            warehouse.name == ''
        ) {
            toastr.warning('Complete todos los campos.')
            return null;
        }
        const _warehouses = [...warehouses, warehouse];

        setWarehouses(_warehouses)
        setWarehouse(warehouseDefault)

        let list = JSON.parse(localStorage.getItem('warehouses'));
        let filtered = list ? list.filter(f => f.logistic_center_id != logisticCenter.id) : [];
        localStorage.setItem('warehouses', JSON.stringify([...filtered, ..._warehouses]));
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col d-flex">
                        <div className="h5 text-uppercase my-auto">
                            BODEGAS
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
                            <label htmlFor="number">Número</label>
                            <input type="number" id="number" name="number" value={warehouse.number}
                                   onChange={handleWarehouses}
                                   className="form-control"/>
                        </div>
                    </div>


                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" id="name" name="name" value={warehouse.name}
                                   onChange={handleWarehouses}
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
                                <th>NÚMERO</th>
                                <th>NOMBRE</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                warehouses.map((d) =>{
                                    return <tr key={d.id}>
                                        <td>{d.number}</td>
                                        <td>{d.name}</td>
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

export default Warehouses
