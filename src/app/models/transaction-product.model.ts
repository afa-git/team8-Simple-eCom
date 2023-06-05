export class TransactionProduct{
    constructor(
        public date_entry:Date,
        public product_id:string,
        public product_name:string,
        public description:string,
        public amount:number,
        public category_name:string,
        public status_trx:string,
        public name:string,
        public date_modified:Date,
        public ref_no:string,
        public from_acct:string,
        public payment_name:string,
        public size:string,
        public user_id:string,
        public email:string,
        public img_url:string,
        public number_tlpn:string,
        public address:string,
        public id?:string
    ){}
}