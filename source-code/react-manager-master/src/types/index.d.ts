interface BMapMap {
  addControl: (control: unknown) => void
  addEventListener: (eventName: string, handler: (event: { latlng: { lng: string; lat: string } }) => void) => void
  addOverlay: (overlay: unknown) => void
  centerAndZoom: (center: string | unknown, zoom: number) => void
  enableScrollWheelZoom: () => void
  removeOverlay: (overlay: unknown) => void
}

interface BMapMarker {
  id?: number
  addContextMenu: (menu: unknown) => void
}

interface Window {
  BMapGL: {
    ContextMenu: new () => { addItem: (item: unknown) => void }
    Map: new (container: string) => BMapMap
    Marker: new (point: unknown) => BMapMarker
    MenuItem: new (label: string, handler: () => void) => unknown
    Point: new (lng: string, lat: string) => unknown
    Polyline: new (points: unknown[], options: Record<string, unknown>) => unknown
    ScaleControl: new () => unknown
    ZoomControl: new () => unknown
  }
  BMapGLLib: {
    TrackAnimation: new (
      map: BMapMap,
      polyline: unknown,
      options: Record<string, unknown>
    ) => { start: () => void; cancel: () => void }
  }
  BMapLib: {
    MarkerClusterer: new (map: BMapMap, options: { markers: BMapMarker[] }) => unknown
  }
}
