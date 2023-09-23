import Vue from "vue";
import moment from "moment";
import 'moment/locale/es'; // Import the Spanish locale

Vue.filter("myGlobal", (created) => {
  if (created) return moment(created).format("MM/DD/YYYY");
  return "-";
});

Vue.filter("myGlobalWithHour", (created) => {
  if (created) return moment(created).format("MM/DD/YYYY h:mm A");
  return "-";
});

Vue.filter("myDateGlobal", (created) =>
  moment(created).format("ddd, D MMM YYYY")
);

Vue.filter("myDateGlobalWithHour", (created) => {
    moment.locale('es'); // Set the locale to Spanish
    return moment(created).format("ddd, D MMM YYYY hh:mm A");
  }
);

Vue.filter("myTime", (created) => {
  if (created) return moment(created, "HH:mm:ss").format("hh:mm A");
  return "-";
});

Vue.filter("myTimeOrNothing", (created) => {
  if (created) return moment(created, "HH:mm:ss").format("hh:mm A");
  return "";
});

Vue.filter("myFullTime", (created) => {
  if (created) return moment(created, "HH:mm:ss").format("HH:mm");
  return "-";
});

Vue.filter("myGlobalDay", (created) => {
  if (created) return moment(created).format("MM/DD/YYYY hh:mm A");
  return "-";
});
Vue.filter("countHoursMinute",(value)=>{
  if(value){
    const hour=parseInt(moment(value,'HH:mm:ss').format('HH'));
    const minutes=moment(value,'HH:mm:ss').format('mm');
    return `${hour} h ${minutes} min`;
  }
  return '-';
});

Vue.filter("countHour",(value)=>{
  if(value){
    const hour=parseInt(moment(value,'HH:mm:ss').format('HH'));
    return `${hour} h`;
  }
  return '-';
})

Vue.filter("myDate", function (created) {
  return moment(created).format("MMMM Do YYYY");
});
Vue.filter("formatDate", function (created) {
  return moment(created).format("YYYY-MM-DD");
});
Vue.filter("myDateText", function (created) {
  return moment(created).format("dddd, Do");
});

Vue.filter("myMonthYear", function (created) {
  return moment(created).format("MMM YY");
});

Vue.filter("myGlobalDayText", function (created){
  if(created) return moment(created).format('dddd, MMMM DD, YYYY').toLocaleString('en-us', {weekday: 'long'})
  return '-'
})

