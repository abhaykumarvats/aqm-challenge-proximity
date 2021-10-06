// dependencies
import React from 'react';
import { get, last, map } from 'lodash';

// resolver
import { aqiToColor } from '../resolvers/aqiToColor';

const SideBar = ({ citiesList, citiesAqi, selectedCity, onCityClick }) => {
    return (
        <ul className='list-group list-group-flush'>
            {map(citiesList, (city) => {
                let itemClassName =
                    'list-group-item d-flex justify-content-between align-items-start';

                if (city === selectedCity) {
                    itemClassName += ' active';
                }

                /* get current city's latest data */
                const latestCityRecord = last(citiesAqi[city]);
                const cityCurrentAqi = get(latestCityRecord, 'aqi', 0);
                const aqiLastUpdated = get(latestCityRecord, 'updated', null);

                /* decide on pill color and pill bg-color based on aqi */
                const pillBgColor = aqiToColor(cityCurrentAqi);
                const pillTextColor =
                    pillBgColor === 'gold' ? 'darkslategray' : 'white';

                return (
                    <li
                        key={city}
                        className={itemClassName}
                        onClick={() => onCityClick(city)}
                    >
                        <div className='ms-2 me-auto'>
                            <div className='fw-bold'>{city}</div>
                            <small>Last updated: {aqiLastUpdated}</small>
                        </div>
                        <span
                            className='badge rounded-pill'
                            style={{
                                color: pillTextColor,
                                background: pillBgColor
                            }}
                        >
                            Current AQI: {cityCurrentAqi}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};

export default SideBar;
