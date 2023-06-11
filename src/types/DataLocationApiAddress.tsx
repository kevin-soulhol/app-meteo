interface IProperties {
    label: string;
    city: string;
    context: string;
    citycode: string;
    x: number;
    y: number;
}

interface IGeometry {
    coordinates: number[];
}

export default interface IDataLocationApiAddress {
    geometry: IGeometry;
    properties: IProperties;
    type: string;
}