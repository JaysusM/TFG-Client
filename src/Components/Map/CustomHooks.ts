import { DateFilter } from './../App/Types';
import { getMeasurements } from './../../Utils/api';
import { useEffect, useState } from "react";
import { Measurement } from "./Types";

export const useMeasurements = (date: DateFilter) => {
    const [measurements, setMeasurements] = useState<Array<Measurement>>();
    
    useEffect(() => {
        setTimeout(() => {
            getMeasurements(date).then((response) => {
                setMeasurements(response.data);
            });
        }, 5000);
    });

    return measurements;
};