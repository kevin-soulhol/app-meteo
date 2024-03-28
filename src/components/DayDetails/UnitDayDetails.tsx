import './unitDayDetails.scss'

export interface IColumn {
    title: string;
    text: string;
}

function UnitDayDetails( { columns } : { columns : IColumn[]}) {
    return (
        <div className="unit-day-details">
            {columns.map((column, index) => {

                let align : 'center' | 'left' | 'right' = 'center'
                if(index === columns.length-1) align = 'right'
                if(index === 0) align = 'left'

                const _style = {
                    textAlign: align
                }

                return (
                <div className="column" key={index} style={_style}>
                    <div className="title">{column.title}</div>
                    <div className="text">{column.text}</div>
                </div>
            )})}
        </div>
    );
}

export default UnitDayDetails;