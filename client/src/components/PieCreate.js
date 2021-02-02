import React from 'react'
import { getSinglePie, createPie } from './lib/api'
import { useParams, useHistory } from 'react-router-dom'


import PieForm from './PieForm'
import useForm from '../utils/useForm'

function PieCreate() {
  const { id } = useParams()
  const history = useHistory()

  const { formdata, setFormdata, handleChange, setErrors } = useForm({
    categories: []
  })
  // ({
  //   categories: []
  // })

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getSinglePie(id)
      setFormdata(data)
    } 
    getData()
  }, [id, setFormdata])
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await createPie(formdata)
      history.push('/basket/')
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }
    
  return (
    <main>
      <h1 className="form-heading">Build Your Own {formdata.name}*</h1>
      <p>*Some assembly required.</p>
      <PieForm 
        formdataCategories={formdata.categories}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </main>
    
  )
}

export default PieCreate