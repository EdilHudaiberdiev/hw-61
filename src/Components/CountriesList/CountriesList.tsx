import React from 'react';
import {ICountry} from '../../types';
import CountryItem from '../CountryItem/CountryItem';

interface Props {
    countriesList: ICountry[];
    getInfo: (alphaCode: string) => void;
}
const CountriesList:React.FC<Props> = ({countriesList, getInfo}) => {


    return (
        <div className='ContriesList'>
            {countriesList.map(country => (
                <CountryItem key={country.alpha3Code} country={country} getInfo={getInfo}/>
            ))}
        </div>
    );
};

export default CountriesList;