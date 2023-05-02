import {
  GET_EXERCISES,
  GET_EXERCISE_BY_ID,
  GET_PRODUCTS,
  GET_USERS,
  FILTER_BY_MUSCLE,
  ORDER_BY_NAME
} from "./action_types";

const initialState = {
  exercise: [],
  exercises: [],
  exercisesOrigin: [],
  products: [],
  users: [],

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXERCISES:
      console.log(action.payload)
      return {
        ...state,
        exercises: action.payload,
        exercisesOrigin: action.payload,
      };
    case GET_EXERCISE_BY_ID:
      return {
        ...state,
        exercise: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case FILTER_BY_MUSCLE: 
    const muscles = state.exercises.filter(el => el.muscle === action.payload)
      return{
         ...state,
         exercisesOrigin: muscles
      };
    case ORDER_BY_NAME:
     const sortedArr = action.payload === 'A-Z'?
     state.exercisesOrigin.sort(function(a, b){
          if(a.name > b.name) {
             return 1;
          }
          if (b.name > a.name){
            return -1;
          }
          return 0
     }):
     state.exercisesOrigin.sort(function(a, b){
      if (a.name > b.name) {
        return-1;
      }
       if (b.name > a.name){
        return 1;
       }
       return 0;
     })
      return {
        ...state,
        exercisesOrigin: sortedArr
      } ; 

    


    default:
      return { ...state };
  }
};

export default rootReducer;
