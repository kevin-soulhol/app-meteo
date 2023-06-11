import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGetLocation from "../utils/useGetLocation";
import { useState } from "react";
import IDataLocationApiAddress from "../types/DataLocationApiAddress";

function SearchbarLocation( { onSelect } : { onSelect : Function }) {  
    const [value, setValue] = useState<string>()
    const [lookingFor, setLookingFor] = useState<string>('')
    const [displayAutocomplete, setDisplayAutocomplete] = useState<boolean>(false)
    const [data] = useGetLocation(lookingFor)

    const _onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setDisplayAutocomplete(true)
        setLookingFor(e.target.value)
    }

    const onClickItem = (item : IDataLocationApiAddress) => {
        setValue(item.properties.label)
        setDisplayAutocomplete(false)
        if(onSelect){
            onSelect( item )
        }
    }

    const _onKeyPress = (evt : React.KeyboardEvent<HTMLInputElement>) => {
        console.log(evt)
    }

  return (
    <div className="SearchbarLocation">
        <div className="containSearchbar">
            <input type="text" autoFocus value={value} onChange={(evt) => _onChange(evt)} onKeyPress={(evt) => _onKeyPress(evt) }/>
            <FontAwesomeIcon icon={faSearch} />
            
            {displayAutocomplete && (
                <div className="containAutocomplete">
                    {data?.map((item, index) => (
                        <div key={index} className="itemAutocomplete" onClick={() => onClickItem(item)}>{item.properties.city} - {item.properties.context}</div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default SearchbarLocation;