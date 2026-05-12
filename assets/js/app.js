const allowedUsers = [
  "admin",
  "milon",
  "sojib",
  "milton",
  "public"
];

function loginApp(){

  const username = document
  .getElementById("usernameInput")
  .value
  .trim()
  .toLowerCase();

  if(!allowedUsers.includes(username)){

    alert(" ⚠️ User name not registered");
    return;

  }

  localStorage.setItem("routerbaba_user", username);

  document.getElementById("loginPopup").style.display = "none";

  document.getElementById("appContainer").style.display = "flex";

  saveLog("Login Success");

}

function loadPage(page){

  showLoader();

  setTimeout(()=>{

    document.getElementById("mainFrame").src = page;

    hideLoader();

    saveLog("Open Page : " + page);

  },1500);

}

function showLoader(){

  const loader = document.getElementById("loader");
  const text = document.getElementById("loaderText");

  loader.style.display = "flex";

  let percent = 0;

  const interval = setInterval(()=>{

    percent += 10;

    text.innerText = "Loading " + percent + "%";

    if(percent >= 100){
      clearInterval(interval);
    }

  },100);

}

function hideLoader(){

  setTimeout(()=>{
    document.getElementById("loader").style.display = "none";
  },1200);

}

function saveLog(action){

  let logs = JSON.parse(localStorage.getItem("routerbaba_logs")) || [];

  logs.push({
    user : localStorage.getItem("routerbaba_user"),
    action : action,
    date : new Date().toLocaleString(),
    browser : navigator.userAgent
  });

  localStorage.setItem("routerbaba_logs", JSON.stringify(logs));

}

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js');
}