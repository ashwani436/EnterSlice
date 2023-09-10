import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../components/FormComponent.css';
import { deleteFormData, editFormData, storeFormData } from './redux/action';

function FormComponent() {

  const dispatch = useDispatch();
  const formDataList = useSelector(state => state.form.formDataList);
  console.log(formDataList);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear validation error for the field
  };

  const handleEdit = (index) => {
  setEditIndex(index);
  setFormData(formDataList[index]);
  };
  
  const handleDelete = (index) => {
    dispatch(deleteFormData(index));
};

  const handleSubmit = (e) => {
      e.preventDefault();

    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile should be 10 digits';
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    if (editIndex !== -1) {
      dispatch(editFormData(formData, editIndex));
    }
    else {
      dispatch(storeFormData(formData));
    }
    // Clear the form
    setFormData({
      name: '',
      email: '',
      mobile: '',
      address: '',
    });

    alert('Data submitted and stored in localStorage.');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            pattern="[0-9]{10}"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Full Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <button type="submit">Submit</button>
          </form>
      <h2>Form Data Table</h2>
       <div className="table-container">
      <table className="my-table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Mobile</td>
            <td>Address</td>
            <td>Edit</td>  
            <td>Delete</td>  
          </tr>
        </thead>
        <tbody>
          {formDataList.map((formData, idx) => (
            <tr key={idx}>
              <td>{formData.name}</td>
              <td>{formData.email}</td>
              <td>{formData.mobile}</td>
              <td>{formData.address}</td>
              <td><button onClick={() => handleEdit(idx)}>Edit</button></td>
              <td>
                <button onClick={() => handleDelete(idx)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>
    </div>
  );
}

export default FormComponent;
