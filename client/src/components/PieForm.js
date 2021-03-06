import React from 'react'
import { getAllCategories } from './lib/api'
//import { Link } from 'react-router-dom'


function PieForm({ handleChange, handleSubmit, formdataCategories }) {
  const [categories, setCategories] = React.useState([])

  

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllCategories()
        // const dataArr = []
        // for (let i = 0; data.length; i++) {
        //   dataArr.push(data[i])
        // }
        setCategories(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  //console.log('Errors: ', errors)
  //console.log('This is formdataCategories:', formdataCategories)

  return (
    <form onSubmit={handleSubmit} className="customise-form">
      <h3 className="light-blue-background">Categories</h3>
      <section>
        {categories && formdataCategories ?
          categories.map(category => {
            return (
              <div key={category.id}>
                <label>{category.name} </label>
                <input 
                  type="checkbox" 
                  onChange={handleChange} 
                  value={JSON.stringify(category)}
                  checked={formdataCategories.some(object => object.name === category.name)}
                />
              </div>
            
            )
          })
          :
          <label>No options available</label>
        }
        <button type="submit" className="checkout-btn blue-background" onClick={handleSubmit}>Add to basket</button>
      </section>
    </form>
  )
}

export default PieForm