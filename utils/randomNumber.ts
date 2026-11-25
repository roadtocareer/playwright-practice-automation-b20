export function generateRandomNumber(min:number,max:number):number{
    let randomNumber= Math.round(Math.random()*(max-min)+min);
    return randomNumber;

}