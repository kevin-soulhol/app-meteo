import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGetLocation from "../utils/useGetLocation";
import { useEffect, useState } from "react";
import IDataLocationApiAddress from "../types/DataLocationApiAddress";

function SearchbarLocation({ onSelect }: { onSelect: Function }) {
    const [value, setValue] = useState<string>()
    const [lookingFor, setLookingFor] = useState<string>('')
    const [displayAutocomplete, setDisplayAutocomplete] = useState<boolean>(false)
    const [hoveredItem, setHoveredItem] = useState<number>(0)
    const [data] = useGetLocation(lookingFor)

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayAutocomplete(true)
        setLookingFor(e.target.value)
        if (data?.length) {
            setHoveredItem(0)
        }
    }

    const onClickItem = (item: IDataLocationApiAddress, index: number) => {
        setValue(item.properties.label)
        setDisplayAutocomplete(false)
        setHoveredItem(index)
        if (onSelect) {
            onSelect(item)
        }
    }

    const _onKeyPress = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        switch (evt.code) {

            case 'ArrowDown':
                setHoveredItem(hoveredItem + 1)
                break;

            case 'ArrowUp':
                setHoveredItem(hoveredItem - 1 ?? 0)
                break;

            case 'Enter':
                if (data) {
                    onClickItem(data[hoveredItem], hoveredItem)
                }
                break;


            case 'Escape':
                if (onSelect) {
                    onSelect(null)
                }
                break;
        }
    }

    const cancelInput = () => {
        setValue('')
        setLookingFor('')
        setDisplayAutocomplete(false)
        if (onSelect) {
            onSelect(null)
        }
    }

    useEffect(() => {
        if (hoveredItem < 0) {
            setHoveredItem(0)
        } else if (data && hoveredItem >= data.length) {
            setHoveredItem(data.length - 1)
        }
    }, [hoveredItem])

    return (
        <div className="SearchbarLocation" onKeyDown={_onKeyPress}>
            <div className="containSearchbar">
                <input type="text"
                    autoFocus
                    value={value}
                    onChange={(evt) => _onChange(evt)}
                    placeholder="City"
                />
                <FontAwesomeIcon icon={faClose} onClick={cancelInput} />

                {displayAutocomplete && (
                    <div className="containAutocomplete">
                        {data?.map((item, index) => (
                            <div key={index} data-hovered={hoveredItem === index} className="itemAutocomplete" onClick={() => onClickItem(item, index)}>{item.properties.city} - {item.properties.context}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchbarLocation;