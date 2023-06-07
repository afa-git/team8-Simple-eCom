export class Buyer {

    constructor(
        public name:string,
        public email:string,
        public passowrd:string,
        public role:string,
        public address:string,
        public no_hp:string,
        public date_modified:Date,
        public id?:string
    ){}
}