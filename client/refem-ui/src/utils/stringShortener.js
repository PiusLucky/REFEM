
export const shortenString = (str, maxLength, ellipsisLocationPercentage, placeholder) => {
  if(str) {
    if(ellipsisLocationPercentage == null || isNaN(ellipsisLocationPercentage) || ellipsisLocationPercentage >= 1 || ellipsisLocationPercentage <= 0){
      ellipsisLocationPercentage = .85;
    }
    if(placeholder === null || placeholder === ""){
      placeholder = "...";
    }
    if (str.length > (maxLength-placeholder.length)) {
      var beginning = str.substr(0, (maxLength - placeholder.length)*ellipsisLocationPercentage );
      return beginning + placeholder;
    }
    return str;
  }
} 