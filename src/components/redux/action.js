export const EDIT_FORM_DATA = 'EDIT_FORM_DATA';
export const DELETE_FORM_DATA = 'DELETE_FORM_DATA';
export const STORE_FORM_DATA = 'STORE_FORM_DATA';

export const storeFormData = (formData) => ({
  type: STORE_FORM_DATA,
  payload: formData,
});

export const editFormData = (formData, index) => ({
  type: EDIT_FORM_DATA,
  payload: { formData, index },
});

export const deleteFormData = (index) => ({
  type: DELETE_FORM_DATA,
  payload: index,
});


