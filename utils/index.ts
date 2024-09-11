export const camelCase = (string: string) => {
  return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return "";
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const romanYear = (year: number = new Date().getFullYear()) => {
  let digits = String(+year).split(""),
    key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
    roman = "",
    i = 3;
  while (i--) {
    // @ts-ignore
    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  }
  return Array(+digits.join("") + 1).join("M") + roman;
};
