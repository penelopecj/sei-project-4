import React from 'react'
import { getSinglePie, createPie, createBasketItem } from './lib/api'
import { useParams, useHistory } from 'react-router-dom'


import PieForm from './PieForm'
import useCheckboxForm from '../utils/useCheckboxForm'

function PieCreate() {
  const { id } = useParams()
  const history = useHistory()

  const { formdata, setFormdata, handleChange, setErrors } = useCheckboxForm({
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
    const unPopulatedCategories = formdata.categories.map(object => {
      return object.id
    })
    try {
      const { data } = await createPie({ ...formdata, name: `Custom ${formdata.name}`, price: `${formdata.price + 10}`, reviews: [], categories: unPopulatedCategories, image: 'https://farm9.staticflickr.com/8333/8391597635_2af90bd702.jpg' })
      handleAddToBasket(data)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  const handleAddToBasket = async (data) => {
    try {
      await createBasketItem({
        quantity: 1,
        product: data.id
      })
      history.push('/basket')
    } catch (err) {
      console.log(err)
    }
  }
    
  return (
    <main>
      <h1 className="form-heading blue-font">Build Your Own {formdata.name}*</h1>
      <p className="grey-font">*Some assembly required.</p>
      <PieForm 
        formdataCategories={formdata.categories}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </main>
    
  )
}

export default PieCreate