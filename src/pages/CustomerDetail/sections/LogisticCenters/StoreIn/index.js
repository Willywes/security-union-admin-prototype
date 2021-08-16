import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {button} from "react-bootstrap-sweetalert/dist/styles/SweetAlertStyles";
import Warehouses from "./Warehouses";
import Workers from "./Workers";

const StoreIn = ({logisticCenter}) =>{

    const[section, setSection] = useState('warehouses');

    return (
        <div className="row">
            <div className="col-12">
                {
                    section == 'warehouses' ? <Warehouses logisticCenter={logisticCenter} section={section} setSection={setSection} /> : null
                }
                {
                    section == 'workers' ? <Workers logisticCenter={logisticCenter} section={section} setSection={setSection} /> : null
                }
            </div>
        </div>
    );
};

export default StoreIn
