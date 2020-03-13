export default function (time) {
  if(time){
    const date = new Date(time * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }else{
    return "";
  }
  
}