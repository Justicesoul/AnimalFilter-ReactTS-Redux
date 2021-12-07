import { useEffect, useState } from 'react';
import Form from '../components/form';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteAnimal, updateAnimals } from '../features/animalsSlice';
import { Link } from 'react-router-dom';

type AnimalType = {
  name: {
    [key: string]: string;
  };
  imgSrc: string;
  specie: string;
  id: number;
};

const Main = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState('en');
  const dispatch = useAppDispatch();
  const animals = useAppSelector((state) => state.animal);
  const species = animals.map((animal) => {
    return animal.specie;
  });

  const filtredSpecies = species.filter(function (item, index) {
    return species.indexOf(item) == index;
  });

  const [animalsFilter, setAnimalsFilter] = useState(animals);

  let languagesAbb: string[] = [];

  if (animals.length !== 0) {
    languagesAbb = Object.keys(animals[0].name);
  }

  const animalSpeciesMenuFilter = (value: string) => {
    const filtredAnimals: AnimalType[] = [...animals].filter((item) => {
      return value === item.specie;
    });
    setAnimalsFilter(filtredAnimals);
  };
  console.log(animals);
  useEffect(() => {
    localStorage.setItem('animals', JSON.stringify(animals));
    setAnimalsFilter(animals);
  }, [animals]);

  return (
    <div className="app">
      <img className="logo" src="/logo.png" alt="logo" />
      <div className="language">
        <select
          className="language__select"
          value={selectLanguage}
          onChange={(e) => {
            setSelectLanguage(e.target.value);
          }}
        >
          {languagesAbb.length !== 0 ? (
            languagesAbb.map((item) => {
              return (
                <option key={item} value={item}>
                  {item.toUpperCase()}
                </option>
              );
            })
          ) : (
            <option value="en">EN</option>
          )}
        </select>
        <Link className="button" to="/translations">
          Add new language
        </Link>
      </div>
      {filtredSpecies.length !== 0 && (
        <nav className="navbar">
          <button
            onClick={() => setAnimalsFilter(animals)}
            className="navbar__button"
          >
            All
          </button>
          {filtredSpecies.map((specie) => {
            return (
              <button
                key={specie}
                onClick={() => animalSpeciesMenuFilter(specie)}
                className="navbar__button"
              >
                {specie}
              </button>
            );
          })}
        </nav>
      )}
      {animalsFilter.length === 0 ? (
        <h1>No animal found</h1>
      ) : (
        <div className="animals">
          {animalsFilter.map((animal, index) => {
            return (
              <div className="animal__card" key={index}>
                <span
                  className="delete-animal__button"
                  onClick={() => dispatch(deleteAnimal(animal.id))}
                >
                  X
                </span>
                <img
                  className="animal__image"
                  src={animal.imgSrc}
                  alt={animal.name[selectLanguage]}
                />
                <h4>{animal.name[selectLanguage]}</h4>
                <span>{animal.specie}</span>
              </div>
            );
          })}
        </div>
      )}
      <div className="buttons">
        <button className="button" onClick={() => setToggleForm(true)}>
          Add animal
        </button>
        <button
          className="button alert"
          onClick={() => dispatch(updateAnimals([]))}
        >
          Clear all
        </button>
      </div>
      {toggleForm && <Form clickHandler={setToggleForm} />}
    </div>
  );
};

export default Main;
