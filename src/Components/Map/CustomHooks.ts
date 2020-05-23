import { getMeasurements } from './../../Utils/api';
import { useEffect, useState } from "react";
import { Measurement } from "./Types";

export const useMeasurements = () => {
    const [measurements, setMeasurements] = useState<Array<Measurement>>();
    
    useEffect(() => {
        setTimeout(() => {
            getMeasurements().then((response) => {
                console.log(response);
                setMeasurements(response.data);
            });
        }, 5000);
    });

    return measurements;
};