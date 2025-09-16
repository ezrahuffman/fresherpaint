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
  // Higgs boson decay data
  measurements?: Array<{
    invariant_mass?: number
    photon1_energy?: number
    photon2_energy?: number
    energy?: number
    time: number
  }>
  // Cosmic ray and particle collision data
  collisions?: Array<{
    momentum: number
    angle: number
    energy_loss?: number
    track_length?: number
  }>
  // Quantum entanglement data
  quantum_measurements?: Array<{
    angle: number
    correlation: number
    measurement_count: number
    statistical_error: number
  }>
  units?: {
    energy?: string
    time?: string
    momentum?: string
    angle?: string
    correlation?: string
  }
  experiment?: string
  detector?: string
  detector_type?: string
  energy_level?: string
  collision_energy?: string
  luminosity?: string
  experiment_type?: string
  bell_parameter?: number
  background_rate?: number
}

export interface ComputerScienceData {
  // Algorithm performance data
  algorithms?: Array<{
    name: string
    runtime: number[]
    input_size?: number[]
    inputSize?: number[] // Support both naming conventions
    complexity?: string
  }>
  // Machine learning training data
  models?: Array<{
    name: string
    epochs: number[]
    accuracy: number[]
    loss: number[]
    parameters: string
    training_time_per_epoch: string
  }>
  // Network performance metrics
  metrics?: Array<{
    timestamp: string
    bandwidth: number
    latency: number
    packet_loss?: number
    signal_strength?: number
    user_count?: number
  }>
  units?: {
    bandwidth?: string
    latency?: string
    packet_loss?: string
  }
  test_environment?: {
    cpu?: string
    memory?: string
    compiler?: string
    optimization?: string
  }
  dataset?: string
  hardware?: string
  test_locations?: string[]
}
