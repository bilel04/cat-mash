export class Cat {
    id!: string;
    url!: string;
    score: number = 0;
    constructor(id: string, url: string) {
        this.id = id;
        this.url = url;
    }
}