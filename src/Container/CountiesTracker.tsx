import {useEffect, useState} from 'react';

export interface ICountry {
  borders: string[];
  name: string;
  alpha3Code: string;
  population: string;
  nativeName: string;
  flag: string;
}

const URL_ALL_COUNTRIES = 'https://restcountries.com/v2/all?fields=alpha3Code,name';
const URL_GET_INFO_BY_ALPHA = 'https://restcountries.com/v2/alpha/';

const CountiesTracker = () => {

  const [countriesList, setCountriesList] = useState<ICountry[]>([])
  const [countryInfo, setCountryInfo] = useState<ICountry | null>(null);
  const [loading, setLoading] = useState({
    allCountries: false,
    oneCountry: false,
  });


  const fetchCountriesList = async () => {
    setLoading({...loading, allCountries: true});
    const response = await fetch(URL_ALL_COUNTRIES);
    const newPosts = await response.json();
    setCountriesList(newPosts);
    setLoading({...loading, allCountries: false});
  };

  useEffect(() => {
    if (countriesList.length === 0) {
      void fetchCountriesList()
    }
  }, []);

  const getInfo = async (alpha3Code: string) => {
    setLoading({...loading, oneCountry: true});
    const response = await fetch(`${URL_GET_INFO_BY_ALPHA}${alpha3Code}`);
    const country: ICountry = await response.json();

    if (country.borders) {
      if (country.borders.length > 0) {
        country.borders =  await Promise.all(
          country.borders.map(async item => {
            const response = await fetch(`${URL_GET_INFO_BY_ALPHA}${item}`);
            const country = await response.json();
            return country.name
          })
        )
      } else {
        country.borders = [];
      }
    } else {
      country.borders = [];
    }

    setLoading({...loading, oneCountry: false});
    setCountryInfo(country);
  };

  return (
    <div className="d-flex">

      <div className="w-50 border border-secondary">
        {loading.allCountries ?
          <div className="spinner-border" role="status"></div>
          :
          <div className='ContriesList'>
            {countriesList.map(country => (
              <div
                className={country.alpha3Code}
                key={country.alpha3Code}
                onClick={() => getInfo(country.alpha3Code)}
              >
                <p>{country.name}</p>
              </div>
            ))}
          </div>
        }
      </div>

      <div className="w-50 border border-secondary">
        {loading.oneCountry ?
          <div className="spinner-border" role="status"></div>
          :
          <>
            {countryInfo ?
              <div>
                <div className='InfoList'>
                  <img src={countryInfo.flag} alt={countryInfo.name} width='50px'/>
                  <p>{countryInfo.name}</p>
                  <p>{countryInfo.borders}</p>
                  <p>{countryInfo.nativeName}</p>
                  <p>{countryInfo.population}</p>
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
              </div>
              :
              null
            }
          </>
        }
      </div>
    </div>
  );
};

export default CountiesTracker;