import type { GeoPath, GeoProjection } from "d3-geo"
import type {
  ComponentType,
  CSSProperties,
  FocusEvent,
  MouseEvent,
  ReactNode,
  RefAttributes,
  RefObject,
  SVGAttributes,
  SVGProps,
} from "react"

// Re-export d3-geo types for convenience
export type { GeoPath, GeoProjection }

export type Point = [number, number]

export interface ProjectionConfig {
  scale?: number
  center?: [number, number]
  parallels?: [number, number]
  rotate?: [number, number, number?]
}

export type ProjectionFunction = (
  width: number,
  height: number,
  config: ProjectionConfig
) => GeoProjection

// Geography types (prepared by the library)
export interface GeographyFeature {
  rsmKey: string
  svgPath: string
  [key: string]: unknown
}

export interface GeographyStyle {
  default?: CSSProperties
  hover?: CSSProperties
  pressed?: CSSProperties
}

// Map context
export interface MapContextValue {
  width: number
  height: number
  projection: GeoProjection
  path: GeoPath
}

// Zoom/Pan types
export interface Position {
  x: number
  y: number
  k: number
}

export interface ZoomPanContextValue {
  x: number
  y: number
  k: number
  transformString: string
}

// D3 zoom event (simplified - avoids d3-zoom type dependency issues)
export interface ZoomEvent {
  transform: { x: number; y: number; k: number }
  sourceEvent?: WheelEvent | MouseEvent
}

// Component props
export interface ComposableMapProps extends SVGAttributes<SVGSVGElement> {
  children?: ReactNode
  /**
   * @default 800
   */
  width?: number
  /**
   * @default 600
   */
  height?: number
  /**
   * @default "geoEqualEarth"
   */
  projection?: string | GeoProjection
  /**
   * @default {}
   */
  projectionConfig?: ProjectionConfig
  className?: string
}

export interface GeographiesChildrenArgument {
  geographies: GeographyFeature[]
  outline: string | null
  borders: string | null
  path: GeoPath
  projection: GeoProjection
}

export interface GeographiesProps
  extends Omit<SVGAttributes<SVGGElement>, "children"> {
  geography?: string | Record<string, unknown> | unknown[]
  parseGeographies?: (features: unknown[]) => unknown[]
  children?: (data: GeographiesChildrenArgument) => ReactNode
  className?: string
}

export interface GeographyProps
  extends Pick<
    SVGProps<SVGPathElement>,
    Exclude<keyof SVGProps<SVGPathElement>, "style">
  > {
  geography: GeographyFeature
  style?: GeographyStyle
  onMouseEnter?: (event: MouseEvent<SVGPathElement>) => void
  onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void
  onMouseDown?: (event: MouseEvent<SVGPathElement>) => void
  onMouseUp?: (event: MouseEvent<SVGPathElement>) => void
  onFocus?: (event: FocusEvent<SVGPathElement>) => void
  onBlur?: (event: FocusEvent<SVGPathElement>) => void
}

export interface ZoomableGroupProps extends RefAttributes<SVGGElement> {
  children?: ReactNode
  /**
   * @default [0, 0]
   */
  center?: Point
  /**
   * @default 1
   */
  zoom?: number
  /**
   * @default 1
   */
  minZoom?: number
  /**
   * @default 8
   */
  maxZoom?: number
  translateExtent?: [[number, number], [number, number]]
  filterZoomEvent?: (event: ZoomEvent) => boolean
  onMoveStart?: (
    position: { coordinates: [number, number]; zoom: number },
    event: ZoomEvent
  ) => void
  onMove?: (
    position: { x: number; y: number; zoom: number; dragging?: unknown },
    event: ZoomEvent
  ) => void
  onMoveEnd?: (
    position: { coordinates: [number, number]; zoom: number },
    event: ZoomEvent
  ) => void
  className?: string
}

export interface MarkerProps
  extends Pick<
    SVGProps<SVGGElement>,
    Exclude<keyof SVGProps<SVGGElement>, "style">
  > {
  coordinates: Point
  children?: ReactNode
  style?: GeographyStyle
  onMouseEnter?: (event: MouseEvent<SVGGElement>) => void
  onMouseLeave?: (event: MouseEvent<SVGGElement>) => void
  onMouseDown?: (event: MouseEvent<SVGGElement>) => void
  onMouseUp?: (event: MouseEvent<SVGGElement>) => void
  onFocus?: (event: FocusEvent<SVGGElement>) => void
  onBlur?: (event: FocusEvent<SVGGElement>) => void
}

export interface AnnotationProps extends SVGProps<SVGGElement> {
  subject: Point
  children?: ReactNode
  connectorProps?: SVGProps<SVGPathElement>
  /**
   * @default 30
   */
  dx?: number
  /**
   * @default 30
   */
  dy?: number
  /**
   * @default 0
   */
  curve?: number
}

export interface GraticuleProps extends SVGProps<SVGPathElement> {
  /**
   * @default [10, 10]
   */
  step?: Point
  /**
   * @default "currentcolor"
   */
  stroke?: string
  /**
   * @default "transparent"
   */
  fill?: string
}

export interface LineProps
  extends Pick<
    SVGProps<SVGPathElement>,
    Exclude<keyof SVGProps<SVGPathElement>, "from" | "to" | "d">
  > {
  /**
   * @default [0, 0]
   */
  from?: Point
  /**
   * @default [0, 0]
   */
  to?: Point
  coordinates?: Point[]
  /**
   * @default "currentcolor"
   */
  stroke?: string
  /**
   * @default 3
   */
  strokeWidth?: number
  /**
   * @default "transparent"
   */
  fill?: string
}

export interface SphereProps extends SVGProps<SVGPathElement> {
  /**
   * @default "rsm-sphere"
   */
  id?: string
  /**
   * @default "transparent"
   */
  fill?: string
  /**
   * @default "currentcolor"
   */
  stroke?: string
  /**
   * @default 0.5
   */
  strokeWidth?: number
}

// Hook options & results
export interface UseGeographiesOptions {
  geography: string | Record<string, unknown> | unknown[]
  parseGeographies?: (features: unknown[]) => unknown[]
}

export interface UseGeographiesResult {
  geographies: GeographyFeature[]
  outline: string | null
  borders: string | null
}

export interface UseZoomPanOptions {
  center: Point
  zoom?: number
  filterZoomEvent?: (event: ZoomEvent) => boolean
  onMoveStart?: (
    position: { coordinates: [number, number]; zoom: number },
    event: ZoomEvent
  ) => void
  onMove?: (
    position: { x: number; y: number; zoom: number; dragging?: unknown },
    event: ZoomEvent
  ) => void
  onMoveEnd?: (
    position: { coordinates: [number, number]; zoom: number },
    event: ZoomEvent
  ) => void
  translateExtent?: [[number, number], [number, number]]
  scaleExtent?: [number, number]
}

export interface UseZoomPanResult {
  mapRef: RefObject<SVGGElement | null>
  position: Position
  transformString: string
}

// Component exports
export const ComposableMap: ComponentType<
  ComposableMapProps & RefAttributes<SVGSVGElement>
>
export const Geographies: ComponentType<GeographiesProps>
export const Geography: ComponentType<
  GeographyProps & RefAttributes<SVGPathElement>
>
export const Graticule: ComponentType<
  GraticuleProps & RefAttributes<SVGPathElement>
>
export const ZoomableGroup: ComponentType<ZoomableGroupProps>
export const Sphere: ComponentType<SphereProps & RefAttributes<SVGPathElement>>
export const Marker: ComponentType<MarkerProps>
export const Line: ComponentType<LineProps & RefAttributes<SVGPathElement>>
export const Annotation: ComponentType<AnnotationProps>

export const MapProvider: ComponentType<{
  width: number
  height: number
  projection: string | GeoProjection
  projectionConfig?: ProjectionConfig
  children?: ReactNode
}>
export const MapContext: import("react").Context<MapContextValue | undefined>
export function useMapContext(): MapContextValue

export const ZoomPanProvider: ComponentType<{
  value?: ZoomPanContextValue
  children?: ReactNode
}>
export const ZoomPanContext: import("react").Context<
  ZoomPanContextValue | undefined
>
export function useZoomPanContext(): ZoomPanContextValue

export function useGeographies(
  options: UseGeographiesOptions
): UseGeographiesResult

export function useZoomPan(options: UseZoomPanOptions): UseZoomPanResult
