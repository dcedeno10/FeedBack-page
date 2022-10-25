
//obtiene los parametros pasados por la direccion
const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

//descodifica los parametos
decode_queryString = Base64Decode(urlParams.get('nps'));

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

function Base64Decode(encoded) {
   var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      enc1 = keyStr.indexOf(encoded.charAt(i++));
      enc2 = keyStr.indexOf(encoded.charAt(i++));
      enc3 = keyStr.indexOf(encoded.charAt(i++));
      enc4 = keyStr.indexOf(encoded.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   } while (i < encoded.length);

   return output;
}
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


