
const	codeButton = document.getElementById("code_button");
const	codeText = document.getElementById("code_text");
const	refreshButton = document.getElementById("refresh_button");
const	codeInfo = document.getElementById("code_info")

var	tempjson = null;

async function	getCode() {
	tempjson = null;
	var		fetched = await fetch(`https://app.unlockr.app/generateCode?uid=${crypto.randomUUID().toUpperCase()}&ver=1.1.4`);
	tempjson = await fetched.json();
	codeText.innerHTML = tempjson.code;
}

document.addEventListener("DOMContentLoaded", () => {
	getCode();
	const interval = setInterval(async () => {
		if (!tempjson)
			return ;
		const perc = ((Math.floor(Date.now() / 100) - tempjson.created_at * 10) / 10) / (tempjson.expiration - tempjson.created_at);
		const deg = perc * 360;
		if (deg < 0)
			deg = 0;
		if (deg > 360) {
			await getCode();
			return ;
		}
		codeButton.style.background = `conic-gradient(blue ${deg}deg, white 0deg)`
	}, 100)
});
refreshButton.addEventListener("click", getCode);

codeButton.addEventListener("click", () => {
	navigator.clipboard.writeText(codeText.innerHTML)
	codeInfo.innerHTML = "- copied -";
	setTimeout(() => {
		codeInfo.innerHTML = "click here to copy";
	}, 3000)
})
