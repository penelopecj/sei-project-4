import React from 'react'
import { getAllPies } from './lib/api'
import { Container } from 'semantic-ui-react'
import { useParams, Link } from 'react-router-dom'
import { CSSGrid, layout } from 'react-stonecutter'

function PieCategoriesView() {

  const [pies, setPies] = React.useState([])
  const [activeCategory] = React.useState('View All')

  useParams()
  //const { id } = useParams()

  React.useEffect(() => {
    const getPies = async () => {
      try {
        const { data } = await getAllPies()
        setPies(data)
      } catch (err) {
        console.log(err)
      }
    }
    getPies()
  }, [])

<<<<<<< HEAD
  const filterPies = async (e) => {
    const filteredPies = pies.filter(pie => {
      return pie.categories.filter(category => {
        return category.name === e.target.innerHTML
      })
    })
    setPies(filteredPies)
    if (activeCategory === 'View All') {
      return pies
    } 
    // else {
    //   const filteredPies = pies.filter(pie => {
    //     return pie.categories.filter(category => {
    //       return category.name === e.target.innerHTML
    //     })
    //   })
    // }
=======

  const filteredPies = (pies) => {
    pies.filter(pie => {
      return pie.category === pies.category
    })
    return pies
  }
  
  // const filterPies = (category) => {
  //   if (category === 'View All') {
  //     return pies
  //   } else {
  //     return pies.filter(pie => {
  //       return pie.tags.includes(category)
  //     })
  //   }
  // }

  const selectedCategory = (e) => {
    const value = e.target.innerHTML.replace('&amp;', '&')
    setActiveCategory(value)
>>>>>>> development
  }
    

  // const filterPies = (selection) => {
  //   if (activeCategory === 'View All') {
  //     return pies
  //   } else {
  //     const filteredPies = pies.filter(pie => {
  //       return pie.categories.filter(category => {
  //         return category.name === selection
  //       })
  //     })
  //     return filteredPies
  //   }
  // }

  // const filterPies = (selection) => {
  //   if (selection === 'View All') {
  //     return pies
  //   } else {
  //     const filteredPies = pies.filter(pie => {
  //       return pie.categories.filter(category => {
  //         return category.name === selection
  //       })
  //     })
  //     return filteredPies
  //   }
  // }

  // const selectedCategory = async (e) => {
  //   //const value = e.target.innerHTML
  //   //.replace('&amp;', '&')
  //   await setActiveCategory(e.target.innerHTML)
  // }

  const categoryList = [
    'View All',
    'Sweet',
    'Savoury',
    'Cherry',
    'Apple',
    'Meat',
    'Chicken',
    'Pumpkin',
    'Lemon',
    'Pecan',
    'Lamb',
    'Beef',
    'Pork',
    'Fish',
    'Vegetable',
    'Berry',
    'Fruit',
    'Nuts'
  ]

  //filterPies(category)

  const itemHeights = [
    300, 330, 270, 250
  ]
  const randomHeight = () => {
    const randomIndex = Math.floor(Math.random() * itemHeights.length)
    return itemHeights[randomIndex]
  }
  console.log(randomHeight())



  return (
    <Container>
      <section>
        <div
          className="category-page-tags"
          onClick={filterPies}>
          {categoryList.map(categoryTag => (
            <Link
              key={categoryTag}
              to={`/pies/category/${categoryTag}`}
              className="category-tag">
              <div className="category-tag">
                <div className={activeCategory === categoryTag ? 'ui olive label category-tag' : 'ui label category-tag'} 
                >{categoryTag}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="ui divider">
        </div>


        <div className="grid-wrapper">
          {pies ?
            <CSSGrid
              component="div"
              columnWidth={290}
              gutterWidth={50}
              gutterHeight={50}
              layout={layout.pinterest}
              duration={800}
              columns={3}
              easing="ease-out"
            >
              {pies.map((pie =>
                <div key={pie.name} itemHeight={270}>
                  <Link
                    to={`/pies/${pie.id}`}
                    key={pies.name}>
                    <div key={pie.name} itemHeight={270} className="category-card">
                      <img className="category-card-image" src={pie.image} />
                      <div className="category-card-content">
                        <div className="ui header category-card-header">
                          {pie.name}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </CSSGrid>
            :
            <div>Loading</div>
          }
        </div>
      </section >
    </Container >
  )

}

export default PieCategoriesView