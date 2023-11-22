import React from 'react';
import {ICountry} from '../../types';

interface Props {
    countryInfo: ICountry;
}
const CountryFullItem: React.FC<Props> = ({countryInfo}) => {
    return (
        <div className='InfoList'>
            <img width="120px" src={countryInfo.flag} alt={countryInfo.name}/>
            <p><b>Name:</b> {countryInfo.name}</p>
            <p><b>Native name:</b> {countryInfo.nativeName}</p>
            <p><b>Population:</b> {countryInfo.population}</p>
            <h4>Borders: </h4>
            {countryInfo.borders.length > 0 ?
                <>
                    {countryInfo.borders.map((country, index) => (
                        <p key={index}>{country}</p>
                    ))}
                </>
                :
                <p>No borders</p>
            }
        </div>
    );
};

export default CountryFullItem;