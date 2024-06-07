// src/components/Tooltip.jsx
import React, { useEffect, useState } from 'react';
import '../styles/Tooltip.css';

function Tooltip({ message }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        visible && <div className="tooltip">{message}</div>
    );
}

export default Tooltip;
