import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AnimalType = {
  name: {
    [key: string]: string;
  }
  imgSrc: string;
  specie: string;
  id: number;
}

const getAnimalList = () => {
  const animalList = localStorage.getItem('animals');
  if (animalList) {
    return JSON.parse(animalList)
  }
  return []
}

const initialState: AnimalType[] = getAnimalList()



export const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    addAnimal: (state, { payload }: PayloadAction<AnimalType>) => {
      state.push(payload);
    },
    updateAnimals: (state, { payload }: PayloadAction<AnimalType[]>) => {
      return (
        state = payload
      )
    },
    deleteAnimal: (state, { payload }) => state.filter((item) => item.id !== payload),
  }
});

export const { addAnimal, updateAnimals, deleteAnimal } = animalsSlice.actions

export default animalsSlice.reducer