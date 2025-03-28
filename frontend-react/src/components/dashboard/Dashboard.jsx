import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosinstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const Dashboard = () => {
    //const accessToken = localStorage.getItem('accessToken')
    //console.log(accessToken)
    const [ticker, setTicker] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [plot, setPlot] = useState()
    const [ma100, setMa100] = useState()
    const [ma200, setMa200] = useState()
    const [prediction, setPrediction] = useState()
    const [mse, setMSE] = useState()
    const [rmse, setRMSE] = useState()
    const [r2, setR2] = useState()
    
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try{
            const response = await axiosInstance.post('/predict/', {
                ticker: ticker
            });
            console.log(response.data)
            // Set plots
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT
            const plotUrl = `${backendRoot}${response.data.plot_img}`
            const ma100Url = `${backendRoot}${response.data.plot_100_dma}`
            const ma200Url = `${backendRoot}${response.data.plot_200_dma}`
            const predictionUrl = `${backendRoot}${response.data.plot_prediction}`
            setPlot(plotUrl)
            setMa100(ma100Url)
            setMa200(ma200Url)
            setPrediction(predictionUrl)
            setMSE(response.data.mse)
            setRMSE(response.data.rmse)
            setR2(response.data.r2)

            if(response.data.error){
                setError(response.data.error)
        }
    }
        catch(error){
            console.error('There was an error making the API request', error)
        }
        finally{
            setLoading(false)
        }
        
    }
    useEffect(() => {
        const fetchProtectedData = async () => {
            try{
                const response = await axiosInstance.get('/protected-view'
                //     {
                //     headers: {
                //         Authorization: `Bearer ${accessToken}`
                //     }
                // }
                )
                //console.log('Success: ', response.data)
            }
            catch(error){
                //console.error('Error fetching data:', error)
            }
            }
            fetchProtectedData();

        }, []
    )
    return (<>
        <div className='container'>
            <div className="row">
                <div className='col-md-6 mx-auto'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className='form-control' placeholder='Le nom de la valeur, ex : AAPL'
                        onChange={(e) => setTicker(e.target.value)} required
                        />
                        <small>{error && <div className='text-danger'>{error}</div>}</small>
                        <button type='submit' className='btn btn-info mt-3'>
                            {loading ? <span><FontAwesomeIcon icon={faSpinner} spin /> Please wait...</span>: 'See Prediction'}
                        </button>
                    </form>
                </div>
                {/* Print prediction plots */}
                {prediction && ( <>
                <div className='prediction mt-5'>
                    <div className='p-5'>
                        <img src={plot} style={{ maxWidth: '100%' }} />
                    </div>
                </div>
                <div className='prediction mt-5'>
                    <div className='p-5'>
                        
                            <img src={ma100} style={{ maxWidth: '100%' }} />
                        
                    </div>
                </div>
                <div className='prediction mt-5'>
                    <div className='p-5'>
                        
                            <img src={ma200} style={{ maxWidth: '100%' }} />
                        
                    </div>
                </div>
                <div className='prediction mt-5'>
                    <div className='p-5'>
                            <img src={prediction} style={{ maxWidth: '100%' }} />
                    </div>
                </div>
                <div className="text-light p-3">
                    <h4>Model Evaluation</h4>
                    <p>Mean Squared Error: {mse}</p>
                    <p>Root Mean Squared Error: {rmse}</p>
                    <p>R-squared: {r2}</p>
                </div>
                </>)}
            </div>
        </div>
        </>
    )
}

export default Dashboard