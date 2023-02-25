module.exports = date;

function date(){
	let today = new Date();
	let options = {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	};
	let fullDate = today.toLocaleDateString("es-US",options);
	return fullDate;
}
