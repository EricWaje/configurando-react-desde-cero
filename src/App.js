import React, { useState } from 'react';
import Otro from './components/Otro';

const App = () => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <h2>Creando app de react desde cero</h2>
                <Otro />
            </div>
        </>
    );
};

export default App;
