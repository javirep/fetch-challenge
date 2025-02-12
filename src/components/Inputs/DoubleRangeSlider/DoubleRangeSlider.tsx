import React, {useState} from "react"

import './DoubleRangeSlider.scss'
import Typography from "../../Typography/Typography.tsx"

type DoubleRangeSliderProps = {
    id: string,
    min: number,
    max: number,
    onChange: (min: number, max: number) => void
    labels?: {
        min: string,
        max: string
    }
}


export const DoubleRangeSlider = (props: DoubleRangeSliderProps) => {
    const {id, min, max, onChange, labels} = props;
    
    const [minValue, setMinValue] = useState(props.min);
    const [maxValue, setMaxValue] = useState(props.max);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, input:string) => {
        const value = parseInt(e.target.value);
        const coloredRange = document.querySelector('.colored_range') as HTMLElement;

        if (input === 'min' && value <= maxValue) {
            setMinValue(value);
            //modify the colored range filler
            coloredRange.style.width = ((maxValue - value) / (max - min) * 100) + '%';
            coloredRange.style.left = ((value - min) / (max - min) * 100) + '%';
            onChange(value, maxValue);
        } else if (input === 'max' && value >= minValue) {
            setMaxValue(value);
            coloredRange.style.width = ((value - minValue) / (max - min) * 100) + '%';
            coloredRange.style.left = ((minValue - min) / (max - min) * 100) + '%';
            onChange(minValue, value);
        }
    }

    return (
        <div className="range_container">
            {
                labels && <Typography variant='body'>{labels.min + ' ' + minValue }</Typography>
            }
            <div className="sliders_control">
                <div className="max_range"> </div>
                <div className="colored_range"> </div>
                <input id={id + "-fromSlider"} className="show" type="range" value={minValue} min={min} max={max} onChange={(e) => handleChange(e, 'min')}/>
                <input id={id + "-toSlider"} className="hide" type="range" value={maxValue} min={min} max={max} onChange={(e) => handleChange(e, 'max')}/>
            </div>
            {
                labels && <Typography variant='body'>{labels.max + ' ' + maxValue}</Typography> 
            }
        </div>
    )
}


