import React from 'react';

const Menu = ({section, setSection, customer, setCustomer}) => {
    return (
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-auto">
                                <div className="button-items">
                                    <button
                                        style={{width: '150px'}}
                                        className={`btn btn-${section != 'logistic_centers' ? 'outline-' : ''}primary`}
                                        onClick={() => setSection('logistic_centers')}>
                                        Centros Logísticos
                                    </button>

                                    <button
                                        style={{width: '150px'}}
                                        className={`btn btn-${section != 'users' ? 'outline-' : ''}primary`}
                                        onClick={() => setSection('users')}>
                                        Usuarios
                                    </button>

                                    <button
                                        style={{width: '150px'}}
                                        className={`btn btn-${section != 'report' ? 'outline-' : ''}primary`}
                                        onClick={() => setSection('report')}>
                                        Informes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu
