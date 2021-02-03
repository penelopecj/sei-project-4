import React from 'react'
import PieSlider from '../PieSlider'

function Home() {

  return (
    <main className="homepage">
      <h1 className="noto-sans">Welcome to PIEKEA</h1>
      <p className="slogan">Online store for fresh baked pies and custom creations. You can even build your own!</p>
      <section className="yellow-background order-online">
        <h3>Order online to collect safely in store, or for home delivery</h3>
        <p>Whilst our stores are temporarily closed you can still browse for baking inspiration, book an online planning appointment, and place orders for contact-free delivery or click and collect.</p>
        <button>Read more</button>
      </section>
      <div className="homepage-slider-section">
        <h2 className="noto-sans">Pie Taster Selectiön</h2>
        <PieSlider />
      </div>
    </main>
    
  )
}

export default Home