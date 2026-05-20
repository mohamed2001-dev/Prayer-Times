import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {fetchPrayerTimes} from "./slices/prayerTimesSlice"
function App() {
  const dispatch = useDispatch()
  const {loading , error , timings } = useSelector((state)=> state.prayerTimes)

  useEffect(()=>{
    dispatch(fetchPrayerTimes())
  },[dispatch])


  return (
     <div>
      <h1 className="flex justify-center text-5xl font-bold mt-5">Prayer Times</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {timings && Object.entries(timings).map(([name, time]) => (
        <div
          key={name}
          className="flex justify-around"
        >
          <h2 className="">{name}: {time}</h2>
        </div>
      ))}
    </div>
  )
}

export default App
