import {useEffect, useState} from 'react';


export interface ContriesProps {
  name: string;
  alpha3Code: string;
}

const URL_ALLIIS = 'https://restcountries.com/v2/all?fields=alpha3Code,name';

const CountiesTracker = () => {

  const [countriesList, setCountiresList] = useState<ContriesProps[]>([])



  useEffect(() => {
      const fetchContriesList = async () => {
        const response = await fetch(URL_ALLIIS);
        const newPosts = await response.json();
        setCountiresList(newPosts);
        console.log(countriesList)
      };

    void fetchContriesList()
  }, []);

  return (
    <>
      <div className='ContriesList'>
        {countriesList.map(item => (
          <div className={item.alpha3Code} key={item.alpha3Code} >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CountiesTracker;