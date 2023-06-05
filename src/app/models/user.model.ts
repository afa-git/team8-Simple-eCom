export class User {
    
    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _tokenExpirationDate: Date,
        public role:string
      ){}
    
      get token(){
        console.log("token",this._tokenExpirationDate)
        console.log("token date",new Date())
        console.log("token",new Date() > this._tokenExpirationDate)
        console.log("token",new Date() > this._tokenExpirationDate)

        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
          return null
        }
        return this._token;
      }
}