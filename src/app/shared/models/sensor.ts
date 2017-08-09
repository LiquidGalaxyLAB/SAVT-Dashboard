export class Sensor {
    _id: string;
    name: string;
    locationLatitude: number;
    locationLongitude: number;
    valueAirTemperature?: number;
    valueAirHumidity?: number;
    valueAirPressure?: number;
    valueSoilTemperature?: number;
    valueLeafWetness?: number;
    valueAtmosphericPressure?: number;
    valueSolarRadiation?: number;
    valueUltravioletRadiation?: number;
    valueTrunkDiameter?: number;
    valueStemDiameter?: number;
    valueFruitDiameter?: number;
    valueAnemometer?: number;
    valueWindVane?: number;
    valuePluviometer?: number;
    valueLuminosity?: number;
    valueUltrasound?: number;
    updated_at: string;
}