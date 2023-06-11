import { useEffect, useState } from "react"
import IDataLocationApiAddress from "../types/DataLocationApiAddress"

const useGetLocation = (searchText: string) => {

    const baseUrl = 'https://api-adresse.data.gouv.fr/search/?q='

    const [data, setData] = useState<IDataLocationApiAddress[]>()

    const get = () => {
        if (!searchText || searchText.length < 3) {
            return;
        }
        let limitSearch = 'municipality'
        let url = `${baseUrl}${searchText}`
        url = `${url}&type=${limitSearch}`

        fetch(url).then(response => response.json())
            .then(data => {
                setData(data.features)
            })
    }

    useEffect(() => {
        get()
    }, [searchText])

    return [data]
}

export default useGetLocation;