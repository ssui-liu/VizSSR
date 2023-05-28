import { scaleSqrt } from 'd3-scale';
import {ResponsiveScatterPlot} from "@nivo/scatterplot";
import Select from 'react-select';

import React, {useState} from "react";
import {bubblePlotData} from "../../bubblePlotData";
import 'rsuite/dist/rsuite.min.css';
import './ScatterPlot.css';


const populationScale = scaleSqrt().domain([0, 1000000]).range([5, 15]);


const processDataForScatterPlot = (data, selectedLivingIndex, highlightedContinent) => {
    const continents = [...new Set(data.map((city) => city.Continent))];

    return continents.map((continent) => ({
        id: continent,
        data: data
            .filter(
                (city) =>
                    city.Continent === continent &&
                    city["Local Purchasing Power Index"] &&
                    city[selectedLivingIndex]
            )
            .map((city) => ({
                x: city["Local Purchasing Power Index"],
                y: city[selectedLivingIndex],
                city: city.City,
                Population: city.Population,
            })),
        // itemOpacity: highlightedContinent === null || continent === highlightedContinent ? 1 : 0.2,
    }));
};



const ScatterPlot = () => {

    const [selectedLivingIndex, setSelectedLivingIndex] = useState("Cost of Living Index");
    const [highlightedContinent, setHighlightedContinent] = useState(null);
    const scatterPlotData = processDataForScatterPlot(
        bubblePlotData,
        selectedLivingIndex,
        highlightedContinent
    );

    const options = [
        { label: 'Cost of Living Index', value: 'Cost of Living Index' },
        { label: 'Rent Index', value: 'Rent Index' },
        { label: 'Cost of Living Plus Rent Index', value: 'Cost of Living Plus Rent Index' },
        { label: 'Groceries Index', value: 'Groceries Index' },
        { label: 'Restaurant Price Index', value: 'Restaurant Price Index' }
    ];

    return (
        <div className="scatter-container" style={{width: '1200px'}}>
            <h2>
                Scatter Plot
            </h2>
            <div className="scatterplot-index-select">
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


            <div style={{ height: '600px', width: '900px' }}>
                <ResponsiveScatterPlot
                    data={scatterPlotData}

                    margin={{ top: 30, right: 30, bottom: 60, left: 90 }}
                    xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                    xFormat={(value) => value.toFixed(1)}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                    yFormat={(value) => value.toFixed(1)}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Local Purchasing Power Index',
                        legendPosition: 'middle',
                        legendOffset: 46,
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: selectedLivingIndex,
                        legendPosition: 'middle',
                        legendOffset: -60,
                    }}
                    legends={[
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 30,
                            translateY: 0,
                            itemsSpacing: 5,
                            itemWidth: 100,
                            itemHeight: 12,
                            itemDirection: "left-to-right",
                            itemOpacity: 0.85,
                            symbolSize: 12,
                            symbolShape: "circle",
                            onMouseEnter: (data) => {
                                setHighlightedContinent(data.id);
                            },
                            onMouseLeave: () => {
                                setHighlightedContinent(null);
                            },
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    colors={{ scheme: 'nivo' }}
                    nodeSize={node => populationScale(node.data.Population)}
                    useMesh={true}
                    tooltip={({ node }) => (
                        <div>
                            <strong>{node.data.city}</strong>
                            <br />
                            Local Purchasing Power Index: {node.data.x}
                            <br />
                            {selectedLivingIndex}: {node.data.y}
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export default ScatterPlot;


{/*<select*/}
{/*    id="living-index-select"*/}
{/*    value={selectedLivingIndex}*/}
{/*    onChange={(e) => setSelectedLivingIndex(e.target.value)}*/}
{/*>*/}
{/*    <option value="Cost of Living Index">Cost of Living Index</option>*/}
{/*    <option value="Rent Index">Rent Index</option>*/}
{/*    <option value="Cost of Living Plus Rent Index">Cost of Living Plus Rent Index</option>*/}
{/*    <option value="Groceries Index">Groceries Index</option>*/}
{/*    <option value="Restaurant Price Index">Restaurant Price Index</option>*/}
{/*</select>*/}
{/*<Dropdown*/}
{/*    title={selectedLivingIndex}*/}
{/*    id="living-index-select"*/}
{/*    onSelect={(value) => setSelectedLivingIndex(value)}*/}
{/*>*/}
{/*    <Dropdown.Item eventKey="Cost of Living Index">Cost of Living Index</Dropdown.Item>*/}
{/*    <Dropdown.Item eventKey="Rent Index">Rent Index</Dropdown.Item>*/}
{/*    <Dropdown.Item eventKey="Cost of Living Plus Rent Index">Cost of Living Plus Rent Index</Dropdown.Item>*/}
{/*    <Dropdown.Item eventKey="Groceries Index">Groceries Index</Dropdown.Item>*/}
{/*    <Dropdown.Item eventKey="Restaurant Price Index">Restaurant Price Index</Dropdown.Item>*/}
{/*</Dropdown>*/}