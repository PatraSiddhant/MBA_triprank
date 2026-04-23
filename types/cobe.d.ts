declare module "cobe" {
    interface GlobeOptions {
        devicePixelRatio?: number;
        width?: number;
        height?: number;
        phi?: number;
        theta?: number;
        dark?: number;
        diffuse?: number;
        mapSamples?: number;
        mapBrightness?: number;
        baseColor?: [number, number, number];
        markerColor?: [number, number, number];
        glowColor?: [number, number, number];
        markers?: { location: [number, number]; size: number }[];
        onRender?: (state: Record<string, any>) => void;
    }
    function createGlobe(canvas: HTMLCanvasElement, options: GlobeOptions): { destroy: () => void };
    export default createGlobe;
}
