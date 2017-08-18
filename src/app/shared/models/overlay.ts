import { Image } from './image';
export class Overlay {
    _id: string;
    latitude: number;
    longitude: number;
    markerDL: [number];
    markerDR: [number];
    markerUR: [number];
    markerUL: [number];
    images: [Image];
}