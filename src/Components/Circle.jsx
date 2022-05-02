import React, { useState, useRef } from 'react'
  
  
const Circle = (props) => {
  
    // We need to keep track of the timer
    const Ref = useRef(null);
  
    // The state for our timer
    const [timer, setTimer] = useState('0');
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [radius, setRadius] = useState('')
    const [diameter, setDiameter] = useState(0.0)
  
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        return {
            total, seconds
        };
    }
  
    const startTimer = (e) => {
        let { total, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(seconds)
        }
    }
  
    const clearTimer = (e) => {  
        setTimer('10');
  
        // If you try to remove this line the updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
  
        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }

    const handleForm = (e) => {
        e.preventDefault()
        
        if (parseFloat(radius) > 0) {

            clearTimer(getDeadTime())

            setProcessing(true)
            setDisabled(true)
            setError('')

            setTimeout(() => {
                fetch(`https://portfolio-site-contact.herokuapp.com/circle/${radius}`)
            .then(res => res.json())
            .then(data => setDiameter(parseFloat(data.diameter)))
            .catch(err => setError('Error occurred! please check your radius or network'))
    
            setProcessing(false)
            setDisabled(false)
            }, 10000)
        }
        else {
            setError('Radius must be greater than 0')
            setDiameter(0.0)

            setTimeout(() => {
                setError('')
            }, 3000)
        }
    }
  
    return (
        <div className={`content ${props.current === 'circle' ? "active" : ""}`} id="circle">
            <form onSubmit={handleForm}>
                <h4>enter radius</h4>
                <input type="text" placeholder='25' onChange={(e) => setRadius(e.target.value)} />
                <button type='submit' className={`btn ${ disabled ? 'disabled' : ''}`} disabled={disabled} >calculate</button>
            </form>
            <h3 style={{'color': 'green'}}>
                { processing ? `Processing... ${timer}` : ''}
            </h3>
            <h4>
                { !processing && error === '' && diameter !== 0.0 ? `Diameter is ${diameter % 1 === 0 ? diameter : diameter.toFixed(2)}` : ''}
            </h4>
            <h4 style={{'color': 'red'}}>
                { error !== '' ? error : '' }
            </h4>
        </div>
    )
}


export default Circle