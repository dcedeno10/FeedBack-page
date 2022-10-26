
//obtiene los parametros pasados por la direccion
const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

//descodifica los parametos
decode_queryString = decode_utf8(atob(urlParams.get('nps')));


const decode_urlParams = new URLSearchParams('?'+decode_queryString);
//estable los valores en la pagina
SetLabelText("lbName",decode_urlParams.get('name'));
SetLabelText("lbIncident",decode_urlParams.get('incident'));
SetLabelText("lbUser",decode_urlParams.get('user'));
SetLabelText("lbService",decode_urlParams.get('service'));
SetLabelText("lbfecha",decode_urlParams.get('date'))

SetTextBoxValue("txtName",decode_urlParams.get('name'));
SetTextBoxValue("txtService",decode_urlParams.get('service'));
SetTextBoxValue("txtIncident",decode_urlParams.get('incident'));
SetTextBoxValue("txtUser",decode_urlParams.get('user'));
SetTextBoxValue("txtDate",decode_urlParams.get('date'));
SetTextBoxValue("txtEmail",decode_urlParams.get('email'));

setSelected(urlParams.get('rank'));

function SetTextBoxValue(id, value)
{
   const textbox = document.getElementById(id);
   textbox.value = value;
}
function SetLabelText(id, value)
{
   const lb = document.getElementById(id);
   lb.innerHTML = value;
}
function RegisterEvent()
{
   const email = document.getElementById("txtEmail").value;
   const name = document.getElementById("txtName").value;
   const incident = document.getElementById("txtIncident").value;
   const service = document.getElementById("txtService").value;
   const date = document.getElementById("txtDate").value
   const rank = document.getElementById("txtRank").value;
   const observation = document.getElementById("txtObservation").value;

   FM.trackCustomEvent("Send a feedback",
  {
    "email": email,
    "user": name,
    "incident": incident,
    "service" : service,
    "date" : date,
    "rank" : rank,
    "observation": observation
  });
  alert("Evento enviado correctamente");

}
function setSelected(rank)
{
   for (let i = 1; i <= 10;i++ )
   {
      const e = document.getElementById("number"+i);
      e.className = "icons";
   }
   const element = document.getElementById("number"+rank);
   element.className = "selected"

   SetTextBoxValue("txtRank",rank);
}
function decode_utf8(utftext) {
   var string = "";
   var i = 0;
   var c = c1 = c2 = 0;

   while ( i < utftext.length ) {

      c = utftext.charCodeAt(i);

      if (c < 128) {
         string += String.fromCharCode(c);
         i++;
      }
      else if((c > 191) && (c < 224)) {
         c2 = utftext.charCodeAt(i+1);
         string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
         i += 2;
      }
      else {
         c2 = utftext.charCodeAt(i+1);
         c3 = utftext.charCodeAt(i+2);
         string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
         i += 3;
      }

   }

   return string;
}




