export interface SaveClientRequest {
  name: string
  email: string
  phone: string
}

export interface UpdateClientRequest {
  name: string
  email: string
  phone: string
}

export interface SaveClientResponse {
  id: string
  name: string
  email: string
  phone: string
}

export interface UpdateClientResponse {
  id: string
  name: string
  email: string
  phone: string
}

export interface ListClientResponse{
  id: string
  name: string
  email: string
  phone: string
}


export interface DetailsClientResponse {
  id: string
  name: string
  email: string
  phone: string
}

