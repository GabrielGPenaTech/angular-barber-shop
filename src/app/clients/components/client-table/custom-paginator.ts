import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable({
  providedIn: 'root'
})
export class CustomPaginator extends MatPaginatorIntl {
  override itemsPerPageLabel: string = 'Itens por página';
  override nextPageLabel: string = 'Próxima página';
  override previousPageLabel: string = 'Pagina anterior';
  override firstPageLabel: string = 'Primeira página';
  override lastPageLabel: string = 'Ultima página';
}
