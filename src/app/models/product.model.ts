export class Product{


    constructor(
        public trx_id:string,
        public name:string,
        public amount:number,
        public stocks:number,
        public image_url:[],
        public description:string,
        public category:string,
        public id?:string
    ){}



}