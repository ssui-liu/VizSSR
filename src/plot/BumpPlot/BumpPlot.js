import { ResponsiveAreaBump } from '@nivo/bump';
import React, {useState} from "react";
import { areaBumpDataEurope } from "../../data/areaBumpDataEurope";
import { areaBumpDataAmerica } from "../../data/areaBumpDataAmerica";
import { areaBumpDataAsia } from "../../data/areaBumpDataAsia";
import { areaBumpDataAfrica } from "../../data/areaBumpDataAfrica";
import { areaBumpDataAP } from "../../data/areaBumpDataAP";
import Select from 'react-select';
import './BumpPlot.css';

const BumpPlot = ({}) => {
    const [selectedContinent, setSelectedContinent] = useState("Europe");
    const options = [
        { label: 'Europe', value: 'Europe' },
        { label: 'America', value: 'America' },
        { label: 'Asia', value: 'Asia' },
        { label: 'Africa', value: 'Africa' },
        { label: 'AP', value: 'AP' }
    ];

    let areaBumpData;
    switch (selectedContinent) {
        case 'Europe':
            areaBumpData = areaBumpDataEurope;
            break;
        case 'America':
            areaBumpData = areaBumpDataAmerica;
            break;
        case 'Asia':
            areaBumpData = areaBumpDataAsia;
            break;
        case 'Africa':
            areaBumpData = areaBumpDataAfrica;
            break;
        case 'AP':
            areaBumpData = areaBumpDataAP;
            break;
        default:
            areaBumpData = areaBumpDataEurope;
            break;
    }

    return (
        <div className='bumpplot-container'
             style={{ width: '1200px',  height: '900px'}}
             id="bumpPlot"
        >
            <h2 className="bumpplot-title">Bump Plot</h2>

            <div className="bumpplot-index-select">
                <Select
                    options={options}
                    isSearchable={false}
                    // placeholder={"Select a index"}
                    value={options.find(option => option.value === selectedContinent)}
                    onChange={(option) => setSelectedContinent(option.value)}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            width: 300
                        })
                    }}
                />
            </div>

            <div style={{ height: '90%'}}>
                <ResponsiveAreaBump
                    data={areaBumpData}
                    margin={{ top: 100, right: 220, bottom: 100, left: 220 }}
                    spacing={8}
                    emptyColor="#eeeeee"
                    colors={{ scheme: 'nivo' }}
                    blendMode="multiply"
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true,
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10,
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'CoffeeScript'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'TypeScript'
                            },
                            id: 'lines'
                        }
                    ]}
                    startLabel="id"
                    endLabel="id"
                    axisTop={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -45,
                        legend: '',
                        legendPosition: 'middle',
                        legendOffset: -36,
                    }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -45,
                        legend: '',
                        legendPosition: 'middle',
                        legendOffset: 32,
                    }}
                />
            </div>
        </div>
    );
}

export default BumpPlot;
