import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import SimpleReactLightbox from 'simple-react-lightbox'
// import { SRLWrapper } from 'simple-react-lightbox'
import { getAllPies } from './lib/api'



function PieSlider() {

  const [pies, setPies] = React.useState(null)
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    const getPies = async () => {
      try {
        const { data } = await getAllPies()
        setPies(data)

      } catch (err) {
        console.log(err)
        setHasError(true)
      }
    }
    getPies()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  }

  const myPies = []

  const arrayPies = () => {
    if (pies) {
      for (let i = 0; i <= pies.length; i++) {
        if (i === 1 || i === 6 || i === 7 || i === 8
          || i === 10) {
          myPies.push(pies[i])
        }
      }
    }
  }
  arrayPies()
  console.log(myPies)
 



  return (
    <SimpleReactLightbox>
      <div className="slider-container">
        <h4 className="pies-list"></h4>
        {pies ?
          // <SRLWrapper options={options}>
          <Slider {...settings}>
            {myPies.map(pie => (
              <div className="card" key={pie.id}>
                <div className="homepage-card-name">
                  
                  <div className="ui-card img-wrapper">
                    <Link to={`/pies/${pie.id}/`}>
                      <img key={pie.id} className="images" src={pie.image} />
                      <div className="homepage-card-overlay">
                        {pie.name}
                      </div>
                    </Link>
                  </div>

                </div>

              </div>
            ))}
          </Slider>
          // </SRLWrapper>
          :
          <h2 className="title has-text-centered">
            {hasError ? 'There was An Error' : '...loading '}
          </h2>
        }
      </div>
    </SimpleReactLightbox >
  )
}


export default PieSlider