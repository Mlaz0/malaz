import { da } from 'date-fns/locale';
import React from 'react'
import { useParams } from 'react-router-dom';

const DoctorDetails = () => {
    const { id } = useParams();

    return (
        <div>DoctorDetails</div>
    )
}

export default DoctorDetails