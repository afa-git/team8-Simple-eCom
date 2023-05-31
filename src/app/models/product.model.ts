export class Product{

    constructor(
        public name:string,
        public description:string,
        public amount:string,
        public stock:string,
        public image_url:string,
        public category:string,
        public date_modified:Date,
        public id?:string
    ){}

}