import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateAnimals } from '../features/animalsSlice';

const langCodes = {
  af: 'Afrikaans',
  sq: 'Albanian',
  an: 'Aragonese',
  ar: 'Arabic',
  hy: 'Armenian',
  as: 'Assamese',
  ast: 'Asturian',
  az: 'Azerbaijani',
  eu: 'Basque',
  bg: 'Bulgarian',
  be: 'Belarusian',
  bn: 'Bengali',
  bs: 'Bosnian',
  br: 'Breton',
  my: 'Burmese',
  ca: 'Catalan',
  ch: 'Chamorro',
  ce: 'Chechen',
  zh: 'Chinese',
  cv: 'Chuvash',
  co: 'Corsican',
  cr: 'Cree',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  nl: 'Dutch',
  en: 'English',
  eo: 'Esperanto',
  et: 'Estonian',
  fo: 'Faeroese',
  fa: 'Farsi',
  fj: 'Fijian',
  fi: 'Finnish',
  fr: 'French',
  fy: 'Frisian',
  fur: 'Friulian',
  gd: 'Gaelic',
  gl: 'Galacian',
  ka: 'Georgian',
  de: 'German',
  el: 'Greek',
  gu: 'Gujurati',
  ht: 'Haitian',
  he: 'Hebrew',
  hi: 'Hindi',
  hu: 'Hungarian',
  is: 'Icelandic',
  id: 'Indonesian',
  iu: 'Inuktitut',
  ga: 'Irish',
  it: 'Italian',
  ja: 'Japanese',
  kn: 'Kannada',
  ks: 'Kashmiri',
  kk: 'Kazakh',
  km: 'Khmer',
  ky: 'Kirghiz',
  tlh: 'Klingon',
  ko: 'Korean',
  la: 'Latin',
  lv: 'Latvian',
  lt: 'Lithuanian',
  lb: 'Luxembourgish',
  mk: 'Macedonian',
  ms: 'Malay',
  ml: 'Malayalam',
  mt: 'Maltese',
  mi: 'Maori',
  mr: 'Marathi',
  mo: 'Moldavian',
  nv: 'Navajo',
  ng: 'Ndonga',
  ne: 'Nepali',
  no: 'Norwegian',
  oc: 'Occitan',
  or: 'Oriya',
  om: 'Oromo',
  pl: 'Polish',
  pt: 'Portuguese',
  pa: 'Punjabi',
  qu: 'Quechua',
  rm: 'Rhaeto-Romanic',
  ro: 'Romanian',
  ru: 'Russian',
  sz: 'Sami',
  sg: 'Sango',
  sa: 'Sanskrit',
  sc: 'Sardinian',
  sd: 'Sindhi',
  si: 'Singhalese',
  sr: 'Serbian',
  sk: 'Slovak',
  sl: 'Slovenian',
  so: 'Somani',
  sb: 'Sorbian',
  es: 'Spanish',
  sx: 'Sutu',
  sw: 'Swahili',
  sv: 'Swedish',
  ta: 'Tamil',
  tt: 'Tatar',
  te: 'Teluga',
  th: 'Thai',
  tig: 'Tigre',
  ts: 'Tsonga',
  tn: 'Tswana',
  tr: 'Turkish',
  tk: 'Turkmen',
  uk: 'Ukrainian',
  hsb: 'Upper Sorbian',
  ur: 'Urdu',
  ve: 'Venda',
  vi: 'Vietnamese',
  vo: 'Volapuk',
  wa: 'Walloon',
  cy: 'Welsh',
  xh: 'Xhosa',
  ji: 'Yiddish',
  zu: 'Zulu',
};

const Translations = () => {
  const [selectLanguage, setSelectLanguage] = useState('');
  const [inputTranslate, setInputTranslate] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const langCodesTytles = Object.values(langCodes);
  const animals = useAppSelector((state) => state.animal);
  const animalNames = animals.map((animal) => {
    return animal.name;
  });

  const getKeyByValue = Object.keys(langCodes).find(
    //@ts-ignore
    (key: number) => langCodes[key] === selectLanguage
  );

  const newAnimalArr = animals.map((item, index) => {
    const name = Object.assign({}, item.name);
    //@ts-ignore
    name[getKeyByValue] = inputTranslate[index];
    const imgSrc = item.imgSrc;
    const specie = item.specie;
    const id = item.id;
    return { name, imgSrc, specie, id };
  });

  const updateFieldChanged = (input: string, index: number) => {
    let newArr = [...inputTranslate];
    newArr[index] = input;
    setInputTranslate(newArr);
  };

  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectLanguage('');
    //@ts-ignore
    delete langCodes[getKeyByValue];
    dispatch(updateAnimals(newAnimalArr));
  };

  return (
    <div className="translations">
      <img className="logo" src="/logo.png" alt="logo" />
      <h1>Translations</h1>
      <form className="translations__form" onSubmit={submit}>
        <select
          value={selectLanguage}
          onChange={(e) => {
            setSelectLanguage(e.target.value);
          }}
        >
          <option value="- Choose language -">- Choose language -</option>
          {langCodesTytles.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        {!selectLanguage ||
          (selectLanguage !== '- Choose language -' && (
            <>
              <table className="translations__table">
                <thead>
                  <tr>
                    <th className="table__heading">Animal</th>
                    <th className="table__heading">Language</th>
                    <th className="table__heading">Translation</th>
                  </tr>
                </thead>
                {animalNames.map((name, index) => {
                  return (
                    <tbody key={name.en}>
                      <tr>
                        <th rowSpan={2} className="table__row subheading">
                          {name.en}
                        </th>
                      </tr>
                      <tr>
                        <th className="table__row">{selectLanguage}</th>
                        <th className="table__row">
                          Enter translation
                          <input
                            type="text"
                            className="translate__input"
                            value={inputTranslate[index]}
                            onChange={(e) =>
                              updateFieldChanged(e.target.value, index)
                            }
                          />
                        </th>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <button className="button">Add language</button>
            </>
          ))}
      </form>
      <Link className="button" to="/">
        Back to Main page
      </Link>
    </div>
  );
};

export default Translations;
