import React, { FunctionComponent, useState } from 'react';
import { ColorLegendProps } from './Types';
import "./ColorLegend.scss";

export const ColorLegend: FunctionComponent<ColorLegendProps> = ({gradient}) => {
    return <div className="color-legend-container">{
        Object.keys(gradient).sort().map((value: string) => {
            return <>
                <div className="gradient-color" style={{
                    backgroundColor: (gradient[value] as string)
                }}/>
                <div className="gradient-value">{Number(value) * 5}V</div>
            </>
        })
    }</div>
}