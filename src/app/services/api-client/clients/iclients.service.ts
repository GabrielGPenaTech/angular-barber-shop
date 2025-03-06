import type { Observable } from "rxjs";
import type { DetailsClientResponse, ListClientResponse, SaveClientRequest, SaveClientResponse, UpdateClientRequest, UpdateClientResponse } from "./client.models";

export interface IClientService {
  save(request: SaveClientRequest): Observable<SaveClientResponse>

  update(id: number, request: UpdateClientRequest): Observable<UpdateClientResponse>

  delete(id: number): Observable<void>

  list(): Observable<ListClientResponse[]>

  findByID(id: number): Observable<DetailsClientResponse>
}
