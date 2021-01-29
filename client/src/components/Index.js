import React from 'react'
import { Link } from 'react-router-dom'
import { getAllPies } from './lib/api'

function Index() {


  const [pies, setPies] = React.useState(null)
  //const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    const getPies = async () => {
      try {
        const { data } = await getAllPies()
        setPies(data)

      } catch (err) {
        console.log(err)
        //setHasError(true)
      }
    }
    getPies()
  }, [])

  return (
    <main>
      {pies ?
        <section className="product-index">
          {pies.map(pie => {
            return (
              <div className="box product" key={pie.id}>
                <Link to={`pies/${pie.id}`}>
                  <div className="space-between">
                    <h3>{pie.name}</h3>
                    <p>£{pie.price}</p>
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
        <p>Loading...</p>
      }
    </main>
  )
}

export default Index