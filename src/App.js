import React, { useState } from 'react'
import './index.css'
import hero from './hero-bcg.jpeg'
import Triangle from './Components/Triangle'
import Circle from './Components/Circle'

const App = () => {

  const [current, setCurrent] = useState('triangle')

  const handleClick = (e) => {
    const id = e.target.dataset.id;
    setCurrent(id)
  }

  return (
    <section className="section">
      <div className="title">
        <h2>about</h2>
        <p>
          A web page to calculate the diameter of a circle and area of a triangle.
        </p>
      </div>

      <div className="about-center section-center">
        <article className="about-img">
          <img src={hero} alt="" />
        </article>
        <article className="about">
          <div className="btn-container">
            <button onClick={handleClick} className={`tab-btn ${current === 'triangle' ? "active" : ""}`} data-id="triangle">
              area of a triangle
            </button>
            <button onClick={handleClick} className={`tab-btn ${current === 'circle' ? "active" : ""}`} data-id="circle">
              diameter of a circle
            </button>
          </div>
          <div className="about-content">
            <Triangle
              current={current}
            />
            <Circle
              current={current}
            />
          </div>
        </article>
      </div>
      <div className="contact">
        <p>
          Developed by Michael Jack. 
          <span>
            <a href='https://michaelinvicto.github.io/portfolio-website/' target='_blank' rel="noopener noreferrer" >
               Contact me
            </a>
          </span>
        </p>
      </div>
    </section>
  )
} 

export default App