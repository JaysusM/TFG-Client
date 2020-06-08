import { DateFilter } from "./../App/Types";
import { getMeasurements } from "./../../Utils/api";
import { useEffect, useState } from "react";
import { Measurement } from "./Types";

export const useMeasurements = (date: DateFilter) => {
  const [measurements, setMeasurements] = useState<Array<Measurement>>();
  const [timeoutIds, setTimeoutIds] = useState<Array<NodeJS.Timeout>>([]);

  useEffect(() => {
    const timeouts = timeoutIds;
    timeouts.push(
      setTimeout(() => {
        getMeasurements(date).then((response) => {
          setMeasurements(response.data);
        });
      }, 5000)
    );
    setTimeoutIds(timeouts);
  }, [measurements]);

  useEffect(() => {
    setMeasurements(undefined);
    if (timeoutIds.length > 0) {
      timeoutIds.forEach((timeout) => {
        clearTimeout((timeout as unknown) as number);
      });
    }
    getMeasurements(date).then((response) => {
      setMeasurements(response.data);
    });
  }, [date]);

  return measurements;
};
