// dependencies
import React, { useEffect, useState } from 'react';
import { cloneDeep, forEach, has, isEmpty, keys } from 'lodash';

// components
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Graph from './components/Graph';

const App = () => {
    const [ws, setWs] = useState(null);
    const [state, setState] = useState({ cities: {}, selectedCity: '' });

    // setup web socket on mount
    useEffect(() => {
        setWs(new WebSocket('ws://city-ws.herokuapp.com'));
    }, []);

    useEffect(() => {
        // setup onmessage listener when socket connection is available
        if (ws !== null) {
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const newState = cloneDeep(state);

                // set first city in first message as default selected city
                if (isEmpty(newState.selectedCity)) {
                    newState.selectedCity = data[0].city;
                }

                // construct data to be used in sidebar and graph
                // pair = { city: <city-name>, aqi: <current-aqi> }
                forEach(data, (pair) => {
                    if (has(newState.cities, pair.city)) {
                        newState.cities[pair.city].push({
                            aqi: pair.aqi.toFixed(2),
                            updated: new Date().toLocaleTimeString()
                        });
                    } else {
                        newState.cities[pair.city] = [
                            {
                                aqi: pair.aqi.toFixed(2),
                                updated: new Date().toLocaleTimeString()
                            }
                        ];
                    }
                });

                setState(newState);
            };
        }
    }, [ws, state]);

    /**
     * Handles updating state with selected city
     * @param {string} city - name of the city selected in sidebar
     */
    const handleCityClick = (city) => {
        setState({ ...state, selectedCity: city });
    };

    /**
     * Handles updating state with selectedCity as 'all'
     */
    const handleCompareAllClick = () => {
        // TBI: Compare All functionality
        // setState({ ...state, selectedCity: 'all' });
    };

    return (
        <div className='container-fluid'>
            <header>
                <NavBar onCompareAllClick={handleCompareAllClick} />
            </header>
            <main className='row'>
                <div
                    className='col-4'
                    style={{
                        height: 'calc(100vh - 50px)',
                        overflowY: 'auto'
                    }}
                >
                    <SideBar
                        citiesList={keys(state.cities)}
                        citiesAqi={state.cities}
                        selectedCity={state.selectedCity}
                        onCityClick={handleCityClick}
                    />
                </div>
                <div className='col-8 graph'>
                    <Graph {...state} />
                </div>
            </main>
        </div>
    );
};

export default App;
