import { useEffect, useState } from "react"
import IDataLocationApiAddress from "../types/DataLocationApiAddress"

const useGetLocation = ( searchText : string ) => {

    const baseUrl = 'https://api-adresse.data.gouv.fr/search/?q='

    const [data, setData] = useState<IDataLocationApiAddress[]>()

    const get = () => {
        let url = `${baseUrl}${searchText}`
        fetch(url).then(response => response.json())
        .then(data => {
            console.log(data)
            setData(data.features)
        })
    }

    useEffect(() => {
        get()
    }, [searchText])

    return [data]
}

export default useGetLocation;