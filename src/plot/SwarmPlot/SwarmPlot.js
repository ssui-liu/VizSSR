import React, {useState} from "react";
import {ResponsiveSwarmPlot} from "@nivo/swarmplot";
import {meanIndexData} from "../../meanIndexData";
import { BasicTooltip } from '@nivo/tooltip';
import { scaleOrdinal } from 'd3-scale';
import Select from 'react-select';
import './SwarmPlot.css';



const Tooltip = ({ node, selectedSwarmIndex }) => {
    const country = node.data.Country;
    const continent = node.data.Continent;
    const indexValue = node.data[selectedSwarmIndex];
    return (
        <BasicTooltip
            id={
                <div>
                    {`Country: ${country}`}
                    <br/>
                    {`Continent: ${continent}`}
                    <br/>
                    {`${selectedSwarmIndex}: ${indexValue}`}
                </div>
            }
            enableChip={true}
        />
    )
};

const Legend = ({ continents }) => {
    return (
        <div className="legend">
            {continents.map((item) => (
                <div key={item.Continent} className="legend-item">
          <span
              className="legend-color"
              style={{ backgroundColor: item.color }}
          ></span>
                    <span className="legend-label">{item.Continent}</span>
                </div>
            ))}
        </div>
    );
};

const SwarmPlot = () => {
    const [selectedLivingIndex, setSelectedLivingIndex] = useState('Cost of Living Index');
    const colorScale = scaleOrdinal()
        .domain(['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Australia', 'Antarctica'])
        .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2']);
    const continents = [
        { Continent: "Asia", color: "#1f77b4" },
        { Continent: "Europe", color: "#ff7f0e" },
        { Continent: "Africa", color: "#2ca02c" },
        { Continent: "Oceania", color: "#d62728" },
        { Continent: "Americas", color: "#9467bd" }
    ];
    const options = [
        { label: 'Cost of Living Index', value: 'Cost of Living Index' },
        { label: 'Rent Index', value: 'Rent Index' },
        { label: 'Cost of Living Plus Rent Index', value: 'Cost of Living Plus Rent Index' },
        { label: 'Groceries Index', value: 'Groceries Index' },
        { label: 'Restaurant Price Index', value: 'Restaurant Price Index' },
        { label: 'Local Purchasing Power Index', value: 'Local Purchasing Power Index'}
    ];

    return (
        <div className="swarmplot-container" id='swarmPlot'>
            <h2>
                Swarm Plot
            </h2>
            <div className="swarmplot-index-select">
                <Select
                    options={options}
                    isSearchable={false}
                    // placeholder={"Select a index"}
                    value={options.find(option => option.value === selectedLivingIndex)}
                    onChange={(option) => setSelectedLivingIndex(option.value)}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            width: 300
                        })
                    }}
                />
            </div>

            <div style={{ height: '500px', width: '900px' }}>
                <ResponsiveSwarmPlot
                    data={meanIndexData}
                    groups={['Countries']}
                    groupBy={() => 'Countries'}
                    identity="Country"
                    layout="horizontal"
                    value={selectedLivingIndex}
                    valueScale={{ type: 'linear', min: 0, max: 120 }}
                    // size={15}
                    forceStrength={4}
                    simulationIterations={100}
                    // colors={{ scheme: 'nivo' }}
                    colors={node => colorScale(node.data.Continent)}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
                    margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: selectedLivingIndex,
                        legendPosition: 'middle',
                        legendOffset: 36,
                    }}
                    axisRight={null}
                    size={{ key: 'size', values: [5, 30], sizes: [10, 60] }}
                    enableGridY={false}
                    enableGridX={true}
                    animate={true}
                    motionStiffness={50}
                    motionDamping={10}
                    isInteractive={true}
                    useMesh={true}
                    tooltip={(node) => <Tooltip node={node} selectedSwarmIndex={selectedLivingIndex}/>}

                />
            </div>
            <Legend continents={continents} />


        </div>
    );
}

export default SwarmPlot;
