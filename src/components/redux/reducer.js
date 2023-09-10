const initialState = {
  formDataList: [],
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_FORM_DATA':
      return {
        ...state,
        formDataList: [...state.formDataList, action.payload],
      };
    case 'EDIT_FORM_DATA':
      const { formData, index } = action.payload;
      const updatedFormDataList = [...state.formDataList];
      updatedFormDataList[index] = formData;
      return {
        ...state,
        formDataList: updatedFormDataList,
      };
    case 'DELETE_FORM_DATA':
      const deletedIndex = action.payload;
      const newFormDataList = state.formDataList.filter(
        (formData, index) => index !== deletedIndex
      );
      return {
        ...state,
        formDataList: newFormDataList,
      };
    default:
      return state;
  }
};

export default formReducer;
