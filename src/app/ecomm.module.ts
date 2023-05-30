export interface Product {
    id?:string,
    trx_id:string,
    name:string,
    amount:number,
    stocks:number,
    image_url:string,
    description:string,
    img_url_1:string,
    img_url_2:string,
    entry_date?:Date
}