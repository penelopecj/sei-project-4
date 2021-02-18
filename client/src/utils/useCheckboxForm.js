import React from 'react'

function useCheckboxForm(initialState) {
  const [formdata, setFormdata] = React.useState(initialState)
  const [errors, setErrors] = React.useState(initialState)

  const handleChange = event => {
    const value = event.target.type === 'checkbox' ? JSON.parse(event.target.value) : event.target.value
    // if (!event.target.checked) {
    //   value = null
    // }
    //const nextState = [...formdata.categories, value]
    // const nextState = [formdata.categories, value].flat()
    //{ ...formdata, [event.target.name]: value }

    // * Write some logic here that checks if the object is already in the array. If it IS, then REMOVE it from the array.

    const nextState = { ...formdata, categories: [...formdata.categories, value] }
    //console.log(nextState)


    const nextErrorState = { ...errors, [event.target.name]: '' }
    
    setFormdata(nextState)
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
export default useCheckboxForm