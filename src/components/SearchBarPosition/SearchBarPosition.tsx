import { useEffect, useState } from 'react';
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './searchBarPosition.scss'
import useGetLocation from '../../utils/useGetLocation';

function SearchBarPosition({ onSelect }: { onSelect: Function }) {
    const [value, setValue] = useState<string>('')
    const [autocompleteOpen, setAutocompleteOpen] = useState<boolean>(false)
    const [data] = useGetLocation(value)

    useEffect(() => {
        if(value.length > 0){
            setAutocompleteOpen(true)
        } else {
            setAutocompleteOpen(false)
        }
    }, [value])

    const _onSelect = (item: any) => {
        setAutocompleteOpen(false)
        if (onSelect) {
            onSelect(item)
        }
    }

    
    const cancelInput = () => {
        setValue('')
        _onSelect(null)
    }

    return (
        <div className="searchbar-position">
            <div className="container-input">
                <input
                    type="text"
                    placeholder="Search position"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                {value.length === 0 ? (
                    <FontAwesomeIcon icon={faSearch}  onClick={cancelInput} />
                ) : (
                    <FontAwesomeIcon icon={faClose} onClick={cancelInput} />
                )}
            </div>

            {autocompleteOpen && data?.length !== 0 && (

                <div className="autocomplete-container">
                    {data?.map((item, index) => (
                        <div 
                            className="item" 
                            key={index}
                            onClick={() => _onSelect(item)}
                        >
                            {item.properties.city} - {item.properties.context}
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
}

export default SearchBarPosition;