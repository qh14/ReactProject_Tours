import React, { useEffect, useState } from 'react';
import './index.css';
import Loading from './Loading';
import Tours from './Tours';
const url = 'https://course-api.com/react-tours-project'
function App() {
    const [loading, setLoading] = useState(true);
    const [tours, setTours] = useState([]);
    const fetchTour = async () => {
        setLoading(true);
        try {
            const respone = await fetch(url);
            const tours = await respone.json();
            setLoading(false)
            setTours(tours)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }


    }

    useEffect(() => {
        fetchTour();
    }, [])
    const removeTour = (id) => {
        const newTour = tours.filter((tour) => tour.id !== id);
        setTours(newTour)
    }
    if (loading) {
        return (
            <main>
                <Loading />
            </main>
        )
    }
    if (tours.length === 0) {
        return (
            <main>
                <div className='title'>
                    <h2>no tours left</h2>
                    <button className='btn' onClick={() => fetchTour()}>
                        refresh
                    </button>
                </div>
            </main>
        )
    }
    return (
        <main>
            <Tours tours={tours} removeTour={removeTour} />
        </main>
    );
}

export default App;
