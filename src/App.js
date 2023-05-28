import React, { useState } from 'react';
import { useContext } from 'react'
import { Link } from 'react-scroll';
import { Sidenav, Nav, Icon } from 'rsuite';
import { ThemeContext } from './contexts/theme'
// import HomeIcon from '@rsuite/icons/legacy/Home';
import './App.css';
import BumpPlot from "./plot/BumpPlot/BumpPlot";
import ScatterPlot from "./plot/ScatterPlot/ScatterPlot";
import SwarmPlot from "./plot/SwarmPlot/SwarmPlot";
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Header from './components/Header/Header'
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import { Divider } from 'rsuite';
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
// import {BubbleChart} from "./plot/scatterPlotD3";


const App = () => {
    const [{ themeName }] = useContext(ThemeContext)
    return (
        <div id='top' className={`${themeName} app`}>
            <Header />
            <main>
                <BumpPlot />
                <Divider />
                <div id="scatterPlot">
                    <ScatterPlot />
                </div>
                <Divider />
                <SwarmPlot />
            </main>
            <Divider />
            <ScrollToTop />
            <footer>
                <p>Representing Numero Cost of Living dataset visualization with Nivo</p>
                <p style={{ fontStyle: 'oblique', marginTop: '0.5rem' }}>
                    By VizSSR Team
                </p>
            </footer>
        </div>
    );
};
export default App;
