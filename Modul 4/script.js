const MyName = "Алексей";
const cels = 2;
const g = 9.8;
const t = 2;
function greet(name)
{
    return(`Привет ${name}`)
}
function celsiusToFahrenheit(celsius)
{
    return((celsius*9.0/5.0)+32.0)
}
//Вдруг будет другая планета
function calculateFallDistance(t,g)
{
return ((1/2)*g*t*t);
}
function calculateAverage(ListNumber)
{
    let sum = 0;
    ListNumber.forEach(number =>  {
        sum+=number;
    })
    let avg = sum/ListNumber.length;
    return avg;
}
function concatStrings(first,next)
{
 return(`Первое слово - «${first}»,второе слово - «${next}»`)
}

console.log(greet(MyName));
console.log(celsiusToFahrenheit(cels));
console.log(calculateFallDistance(t,g))
console.log(calculateAverage([1,2,3]));
let first = prompt(`Необходимо ввести первое слово ${MyName}`);
let next = prompt(`Необходимо ввести второе слово ${MyName}`);
console.log(concatStrings(first,next))
