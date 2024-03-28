import { useDispatch, useSelector } from "react-redux";
import { ILocation, setDataToday, setDataTomorrow, setDataWeek, weatherService } from "../redux/WeatherReducer";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useGetWeather, { ISanitizedData } from "../utils/useGetWeather";
import InsidePage from "../components/InsidePage/InsidePage";



const Latitude = 43.60
const Longitude = 1.43333



function Home() {
    const dispatch = useDispatch()
    const _weatherService = useSelector(weatherService)
    const [location, setlocation] = useState<ILocation>({ latitude: Latitude, longitude: Longitude, label: 'Toulouse' })
    const [tomorrow, setTomorrow] = useState<boolean>(true)

    const [loading, dataToday, dataTomorrow, dataWeek] = useGetWeather(location)

    useEffect(() => {
        if(dataToday){
            dispatch(setDataToday(dataToday))
        }
        if(dataTomorrow){
            dispatch(setDataTomorrow(dataTomorrow))
        }
        if(dataWeek){
            dispatch(setDataWeek(dataWeek))
        }
    }, [dataToday, dataTomorrow, dataWeek])


    useEffect(() => {
        setTomorrow(_weatherService.tomorrow)
    }, [_weatherService.tomorrow])



    return (
        <>
        <AnimatePresence>
            {!loading && (
                <>
                {tomorrow ? (
                    
                    <motion.div 
                    className="layout-animation tomorrow"
                    initial={{ x: 1000 }} 
                    animate={{ x: 0 }} 
                    exit={{ x: -1000 }} 
                    >
                        <InsidePage data={dataTomorrow as ISanitizedData} tomorrow={true} />
                    </motion.div>

                ) : (
                    
                    <motion.div 
                    className="layout-animation today"
                    initial={{ x: -1000 }} 
                    animate={{ x: 0 }} 
                    exit={{ x: 1000 }} 
                    >
                        <InsidePage data={dataToday as ISanitizedData} tomorrow={false} />
                    </motion.div>

                )
                }
                </>
            )}
        </AnimatePresence> 
        </>
    )
}

export default Home;
