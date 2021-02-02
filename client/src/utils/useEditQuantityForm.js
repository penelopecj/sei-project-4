import React from 'react'

function useEditQuantityForm(initialState) {
  const [formdata, setFormdata] = React.useState(initialState)
  const [errors, setErrors] = React.useState(initialState)
  const handleChange = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    // const nextState = { ...formdata, [event.target.name]: value }
    // const editedObject = { ...formdata[event.target.id], [event.target.name]: value }
    const editingArray = [...formdata]
    //formdata[event.target.id] = editingArray
    editingArray[event.target.id].quantity = value
    
    // console.log('formdata', formdata)
    const nextErrorState = { ...errors, [event.target.name]: '' }
    setFormdata(editingArray)
    console.log('formdata', formdata)
    setErrors(nextErrorState)
  }

  return {
    formdata,
    setFormdata,
    errors,
    handleChange,
    setErrors
  }
}
export default useEditQuantityForm