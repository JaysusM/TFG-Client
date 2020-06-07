export type Measurement = {
    _id: string,
    userId: string,
    position: Position,
    value: number,
    date: Date
};

export type Position = {
    latitude: number,
    longitude: number
}