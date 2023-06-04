import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  transform(value: any,flag:string,data?:any) {
    console.log("value",value)
    let result = ""
    if(flag == "status"){
      switch (value) {
        case  "0":
          result = "In Cart"
          break;
        case  "1":
          result = "Pending Payment"
          break;
        case  "2":
          result = "Pending Approve"
          break;
        case  "3":
          result = "Cancel Payment"
          break;
        case  "4":
          result = "Reject Order"
          break;
        case  "5":
          result = "In Delivery"
          break;
        case  "5":
          result = "Complite"
        break;
        default:
          result = "No result";
          break;
      }
    }else if ( flag == "curr"){
      // data = ref_no
      console.log("data",data)
      let last3char = data.toString().substring(data.length-3,data.length)
      console.log("last",last3char)

      result = (parseFloat(value) + parseFloat(last3char)).toString();
      console.log(result)

    }
    return result;
  }


}
