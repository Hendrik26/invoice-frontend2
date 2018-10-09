import {InvoiceType} from './invoice-type';
import {packageChunkSort} from '@angular-devkit/build-angular/src/angular-cli-files/utilities/package-chunk-sort';

export class ThreeStateButton {

    sortingOrderId = 0;
    private sortBy: string;

    constructor(sortBy: string) {
        this.sortBy = sortBy;
    }


    //region getter
    public getSortBy(){
        return this.sortBy;
    }

    public getSortingOrderId(): number {
        return this.sortingOrderId;
    }

    public getSortingOrderName(): string {
        if (this.sortingOrderId == 0) {
            return 'gleich';
        }
        ;
        if (this.sortingOrderId == 1) {
            return 'aufwaerts';
        }
        ;
        if (this.sortingOrderId == 2) {
            return 'abwaerts';
        }
        ;
        return 'SortFehler';
    }

    //endregion

    //region setter
    public setSortingOrderId(id: number): void {
        this.sortingOrderId = id;
        console.log('setSortingOrderId to' + id);
    }

    //endregion

    //region other methods
    public switch(): void {
        switch (this.sortingOrderId) {
            case 0:
                this.setSortingOrderId(1);
                break;
            case 1:
                this.setSortingOrderId(2);
                break;
            case 2:
                this.setSortingOrderId(1);
        }
    }

    public reset(): void {
        this.sortingOrderId = 0;
    }

    //endregion

}
