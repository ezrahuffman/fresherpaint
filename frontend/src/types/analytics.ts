export type AnalyticsType = 'physics' | 'computer_science'

export interface AnalyticsData {
  id: string
  title: string
  description: string
  dataType: AnalyticsType
  data: any
  createdAt: Date
  updatedAt: Date
}

export interface PhysicsData {
  measurements?: Array<{
    energy: number
    time: number
  }>
  collisions?: Array<{
    momentum: number
    angle: number
  }>
  units?: {
    energy?: string
    time?: string
    momentum?: string
    angle?: string
  }
  detector?: string
  energy_level?: string
}

export interface ComputerScienceData {
  algorithms?: Array<{
    name: string
    runtime: number[]
    inputSize: number[]
  }>
  metrics?: Array<{
    timestamp: string
    bandwidth: number
    latency: number
  }>
  units?: {
    bandwidth?: string
    latency?: string
  }
}
