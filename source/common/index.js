
const colors = [
  "#ce5505","#bd812c","#9123b5","#b60da4","#e57716",
  "#3e4955","#36597c","#8332a5","#9858b2","#127fc6",
  "#169c55","#3cc978","#1b917a","#25b498","#e84938"
]

export function makeColor() {
	let colorSeedLen = colors.length;
	let rand = Math.random();
	let randNum = Math.round(rand * (colors-1));
	return colors[randNum];
}

export function makeRandomCode(len){
    len = len || 32;
　　let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
　　let maxPos = $chars.length;
　　let result = '';
　　for (let i = 0; i < len; i++) {
        result += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return result;
}