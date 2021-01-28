import React from 'react'
//import { Link } from 'react-router-dom'
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

  console.log(pies)
  return (
    <main>
      {pies ?
        <div>
          {pies.map(pie => {
            return (
              <div key={pie.pk}>
                {pie.name}
              </div>
            
            )

          })}
        </div>
        :
        <p>Loading...</p>
      }
    </main>
  )
}

export default Index