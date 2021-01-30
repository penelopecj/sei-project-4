import React from 'react'
import { getAllPies } from './lib/api'
import { Container } from 'semantic-ui-react'
import { useParams, Link } from 'react-router-dom'
import { CSSGrid, layout } from 'react-stonecutter'

function PieCategoriesView() {

  const [pies, setPies] = React.useState([])
  const [activeCategory, setActiveCategory] = React.useState(useParams().category)

  useParams()
  const { category } = useParams()

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
  }

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

  filterPies(category)

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
          onClick={(e) => selectedCategory(e)}>
          {categoryList.map(categoryTag => (
            <Link
              key={categoryTag}
              to={`/pies/category/${categoryTag}`}
              className="category-tag">
              <div className="category-tag">
                <div
                  className={activeCategory === categoryTag
                    ? 'ui olive label category-tag' : 'ui label category-tag'}>{categoryTag}</div>
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
              {filterPies(category).map((pie =>
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