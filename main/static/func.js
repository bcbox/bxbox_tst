function showLoader(){document.getElementById("spinner").style.display="flex"}function hideLoader(){document.getElementById("spinner").style.display="none"}function reset(){updateSetting("reset_bcbox",1)}function save(e,t){updateSetting(e,document.getElementById(t).value)}function saveWifiClick(){updateWifi(document.getElementById("wifiSELECT").value,document.getElementById("wifiPWD").value)}function onChange(e,t){let n=1;!1===e.checked&&(n=0),updateSetting(t,n)}function updateWifi(e,t){showLoader(),fetch("/updateWifi",{method:"POST",body:JSON.stringify({ssid:e,password:t})}).then(()=>{hideLoader(),loadWifi(),document.getElementById("wifiPWD").value=""}).catch(e=>{hideLoader()})}function updateSetting(e,t){showLoader(),fetch("/updateSetting",{method:"POST",body:JSON.stringify({variable:e,value:t})}).then(()=>{hideLoader()}).catch(e=>{hideLoader()})}function togglePasswordVisibility(){let e=document.getElementById("wifiPWD");document.getElementById("showPassword").checked?e.type="text":e.type="password"}function refreshPage(){showLoader(),window.location.reload()}function loadWifi(){showLoader(),fetch("/loadWifiSSID").then(e=>e.json()).then(e=>{document.getElementById("SSID").innerHTML=e.connectSSID;let t=document.getElementById("wifiSELECT");for(let n in t.innerHTML="",e){if("connectSSID"===n||""===n)continue;let i=document.createElement("option");i.value=n,i.innerHTML=n,t.appendChild(i)}hideLoader()}).catch(e=>{hideLoader()})}function getGsmStatus(e){if("0"===e)return"GSM_OFF";if("1"===e)return"SIM_CARD_NOT_READY";if("2"===e)return"INIT_SUCCESSFUL";if("3"===e)return"CONNECT_TO_PS";if("4"===e)return"SET_UP_PPP";else if("5"===e)return"MQTT_DISCONNECT";else if("6"===e)return"MQTT_CONNECT"}function loadSettings(){showLoader(),fetch("/loadSettings").then(e=>e.json()).then(e=>{document.getElementById("ACTUAL_SW_VERSION").innerHTML=e.actual_sw_version,document.getElementById("SUPPLY_STATUS").innerHTML="0"===e.supply_status?"Grid":"1"===e.supply_status?"Battery":"Error",document.getElementById("BATTERY_STATUS").innerHTML=e.battery_status+" %",document.getElementById("GSM_STATUS").innerHTML=getGsmStatus(e.gsm_status),document.getElementById("GSM_SIGNAL").innerHTML=e.gsm_signal+" %",document.getElementById("RESET_COUNTER").innerHTML=e.reset_counter,document.getElementById("ERRORS").innerHTML=e.errors,document.getElementById("ID").innerHTML=e.id,document.getElementById("AUTOMATIC_UPDATE").checked="1"===e.automatic_update,document.getElementById("TESTING_SOFTWARE").checked="1"===e.testing_software,document.getElementById("MQTT_CLIENT_ID").value=e.mqtt_client_id,document.getElementById("RELAYS").value=e.relays,document.getElementById("MQTT_TOPIC").value=e.mqtt_topic,document.getElementById("APN").value=e.apn,document.getElementById("WEB_PWD").value=e.web_pwd,document.getElementById("GSM_MODEM").checked="1"===e.gsm_modem,document.getElementById("WIFI").checked="1"===e.wifi_enable,document.getElementById("WIFI_RSSI").innerHTML=e.wifi_rssi+" %",hideLoader(),loadWifi()}).catch(e=>{hideLoader()})}