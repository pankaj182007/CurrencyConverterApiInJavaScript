const baseUrl="https://latest.currency-api.pages.dev/v1/currencies/"

const amt=document.querySelector("#amount");
const convtBtn=document.querySelector("#convtBtn");
const dropDownSelects= document.querySelectorAll(".dropdown select");
const imgF=document.querySelector("#imgFrom");
const imgT=document.querySelector("#imgTo");
const msg=document.querySelector(".msg");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const amount=document.querySelector("#amount");

let data;


for (let select of dropDownSelects) {
    for ( currCode in countryList) {
        let newOptions=document.createElement("option");
        newOptions.innerText=currCode;
        newOptions.value=currCode;
        if(select.name==="from"&& currCode=="USD")
        {
            newOptions.selected="selected";
        }
        if(select.name==="to"&& currCode=="INR")
            {
                newOptions.selected="selected";
            }
         select.append(newOptions);      
    }  
    select.addEventListener("change",(evet)=>{
        flagUpdate(evet.target);
    });      
}

const flagUpdate=(evet)=>{
    let nsrc=`https://flagsapi.com/${countryList[evet.value]}/flat/64.png`;
    if(evet.name=="from")
    {
        
        imgF.src=nsrc;
        console.log(countryList[evet.value]);
        console.log(imgF.src);
    }else if(evet.name=="to")
    {
       
        imgT.src=nsrc;
        console.log(countryList[evet.value]);
        console.log(imgT.src);

    }
}

window.addEventListener("load",()=>{
    currData();
});

const currData=async ()=>{
    const url=`${baseUrl}${fromCurr.value.toLowerCase()}.json`;
    let fetchData=await fetch(url);
    data= await fetchData.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    msg.innerText="1 "+fromCurr.value+" = "+rate+" "+toCurr.value;
    amount.value=rate*amount.value;
    console.log(data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]);
}

convtBtn.addEventListener("click" , (evt)=>{

    evt.preventDefault();
    
    console.log(amount.value);
    if(amount.value===""||amount.value<1)
    {
        amount.value=1;
        console.log(amount.value);
    }
     currData();
  });
