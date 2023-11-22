import React from 'react';
import {ICountry} from '../../types';

interface Props {
    country: ICountry;
    getInfo: (alphaCode: string) => void;
}
const CountryItem: React.FC<Props> = ({country, getInfo}) => {
    return (
        <div
            className="countryItem"
            onClick={() => getInfo(country.alpha3Code)}
        >
            <p>{country.name}</p>
        </div>
    );
};

export default CountryItem;