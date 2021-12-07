import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addAnimal } from '../features/animalsSlice';

interface Props {
  clickHandler: (arg0: boolean) => void;
}

const Form: React.FC<Props> = ({ clickHandler }) => {
  const [createNewSpecies, setCreateNewSpecies] = useState(false);
  const [inputAnimalName, setInputAnimalName] = useState('');
  const [inputAnimalImage, setInputAnimalImage] = useState('');
  const [inputCreateSpecie, setInputCreateSpecie] = useState('');
  const [errorsCheck, setErrorsCheck] = useState(true);
  const [selectSpecie, setSelectSpecie] = useState('');
  const dispatch = useAppDispatch();
  const animals = useAppSelector((state) => state.animal);
  const species = animals.map((animal) => {
    return animal.specie;
  });

  const filtredSpecies = species.filter(function (item, index) {
    return species.indexOf(item) == index;
  });

  const regexURL =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  const createNewSpecie = () => {
    setCreateNewSpecies(!createNewSpecies);
  };

  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorsCheck(false);
    if (
      inputAnimalName.length > 2 &&
      regexURL.test(inputAnimalImage) &&
      (inputCreateSpecie.length > 3 || selectSpecie !== '') &&
      selectSpecie !== '- Choose specie -'
    ) {
      clickHandler(false);
      dispatch(
        addAnimal({
          name: { ['en']: inputAnimalName },
          imgSrc: inputAnimalImage,
          specie: createNewSpecies ? inputCreateSpecie : selectSpecie,
          id: Math.random(),
        })
      );
    }
  };

  return (
    <div className="container">
      <form onSubmit={submit} className="form">
        <h2>Add animal</h2>
        <label>
          Name
          <input
            className="form__label"
            type="text"
            placeholder="Animal name"
            value={inputAnimalName}
            onChange={(e) => {
              setInputAnimalName(e.target.value);
            }}
            style={{
              borderColor:
                inputAnimalName.length < 3 && !errorsCheck ? 'red' : 'black',
            }}
          />
          {inputAnimalName.length < 3 && !errorsCheck && (
            <span className="form__error">Minimum 3 charechters required</span>
          )}
        </label>
        <label>
          Image source
          <input
            className="form__label"
            type="text"
            placeholder="Image source"
            value={inputAnimalImage}
            onChange={(e) => {
              setInputAnimalImage(e.target.value);
            }}
            style={{
              borderColor:
                !regexURL.test(inputAnimalImage) && !errorsCheck
                  ? 'red'
                  : 'black',
            }}
          />
          {!regexURL.test(inputAnimalImage) && !errorsCheck && (
            <span className="form__error">Choose valid URL link</span>
          )}
        </label>
        <label>
          Species
          <span className="form__button-new-species" onClick={createNewSpecie}>
            {!createNewSpecies
              ? ' (Add new specie)'
              : ' (Choose from the list)'}
          </span>
          <input
            type="text"
            className="form__label"
            style={{
              display: !createNewSpecies ? 'none' : 'block',
              borderColor:
                inputCreateSpecie.length < 4 && !errorsCheck ? 'red' : 'black',
            }}
            value={inputCreateSpecie}
            onChange={(e) => {
              setInputCreateSpecie(e.target.value);
            }}
          />
          {inputCreateSpecie.length < 4 && createNewSpecies && !errorsCheck && (
            <span className="form__error">Minimum 4 charechters required</span>
          )}
          <select
            value={selectSpecie}
            onChange={(e) => {
              setSelectSpecie(e.target.value);
            }}
            className="form__label"
            style={{
              display: createNewSpecies ? 'none' : 'block',
              borderColor:
                (selectSpecie === '' || selectSpecie === '- Choose specie -') &&
                !createNewSpecies &&
                !errorsCheck
                  ? 'red'
                  : 'black',
            }}
          >
            <option value="- Choose specie -">- Choose specie -</option>
            {filtredSpecies.map((animal) => {
              return (
                <option key={Math.random()} value={animal}>
                  {animal}
                </option>
              );
            })}
          </select>
          {(selectSpecie === '' || selectSpecie === '- Choose specie -') &&
            !createNewSpecies &&
            !errorsCheck && (
              <span className="form__error">Choose or create specie</span>
            )}
        </label>
        <div className="form__buttons">
          <button className="button">Add</button>
          <button onClick={() => clickHandler(false)} className="button">
            Escape
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
