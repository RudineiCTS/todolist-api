import { format, compareAsc, formatDate } from "date-fns";

export function ValidateExpirationDate(date?:any){
  const dateCurrent = format(Date.now(), 'dd/MM/yyyy' )
  if(date < dateCurrent){
    console.log('retornou erro')
    return  new Error('Data de vencimento inválida')
  }
  console.log('retornou a data')
  return date;
}