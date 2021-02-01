import React from 'react'
import { Link } from 'react-router-dom'
import { getAllPies, getAllCategories } from './lib/api'

function Index() {


  const [pies, setPies] = React.useState(null)
  const [categories, setCategories] = React.useState(null)
  //const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllPies()
        setPies(data)

      } catch (err) {
        console.log(err)
        //setHasError(true)
      }
    }
    getData()
  }, [])


  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllCategories()
        setCategories(data)

      } catch (err) {
        console.log(err)
        //setHasError(true)
      }
    }
    getData()
  }, [])

  const handleFilterPies = (event) => {
    const results = pies.filter(pie => {
      return pie.categories.includes(parseInt(event.target.id))
    })
    setPies(results)
  }

  const handleClearFilter = async () => {
    const { data } = await getAllPies()
    setPies(data)
  }

  return (
    <main>
      {categories ?
        <div className="categories-wrapper">
          {categories.map(category => {
            return <button key={category.id} id={category.id} onClick={handleFilterPies}>{category.name}</button>
          })}
          <button onClick={handleClearFilter} className="clear-btn">Clear Selection</button>
        </div>
        :
        <div>Filters loading...</div>
      }
      <br />
      {pies && pies.length > 0 ?
        <section className="product-index">
          {pies.map(pie => {
            return (
              <div className="box product" key={pie.id}>
                <Link to={`pies/${pie.id}`}>
                  <div className="space-between">
                    <h3>{pie.name}</h3>
                    <p>£{pie.price.toFixed(2)}</p>
                  </div>
                  <figure>
                    <img src={pie.image} alt={pie.name} />
                  </figure>
                </Link>
              </div>
            
            )

          })}
        </section>
        :
        <p>There are no pies that match your search.</p>
      }
    </main>
  )
}

export default Index