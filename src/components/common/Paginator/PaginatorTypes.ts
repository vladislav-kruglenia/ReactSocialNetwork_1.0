export type PaginatorProps = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (p:number) => void,
    portionSize?: number // необязательно
}