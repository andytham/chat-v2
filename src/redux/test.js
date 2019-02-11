let time = "2006-01-01T17:12:12.000Z"
let dateTime = time.split('T');
let leftHand = dateTime[0]

let tempTime = dateTime[1].split('.')
let splitTime = tempTime[0].split(':')
let tH = splitTime[0];
let tM = splitTime[1];
let tS = splitTime[2];
let rightHand;
if (Number(tH) > 12){
	let newHour = Number(tH) - 12;
	rightHand = newHour + ":" + tM + ":" + tS + " PM" 
} else {
	rightHand = tH + ":" + tM + ":" + tS + " AM" 
}

console.log(leftHand + rightHand);

let timestamp = new Date();
// let options  = {hc: "h24"}
console.log(timestamp.toLocaleDateString('ko-KR') + " " + timestamp.toLocaleTimeString("options"))