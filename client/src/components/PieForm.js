import React from 'react'
import { getAllCategories } from './lib/api'
//import { Link } from 'react-router-dom'


function PieForm({ handleChange, handleSubmit, formdata, errors }) {
  const [categories, setCategories] = React.useState([])

  

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllCategories()
        setCategories(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  console.log('Errors: ', errors)
  console.log(formdata)

  return (
    <form onSubmit={handleSubmit} className="box">
      <h3>Categories</h3>
      <div>
        {categories ?
          categories.map(category => {
            return (
              <div key={category.id}>
                <label value={category.id}>{category.name}</label>
                <input type="checkbox" onChange={handleChange} />
              </div>
            
            )
          })
          :
          <label>No options available</label>
        }
      </div>
      <button type="submit" className="checkout-btn blue-background">Add to basket</button>
    </form>
  )
}

export default PieForm