"use strict";
var Months = { 1 : "January",
2 : "February",
3 : "March",
4 : "April",
5 : "May",
6 : "June",
7 : "July",
8 : "August",
9 : "September",
10 : "October",
11 : "November",
12 : "December",
}
var Days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var thirty = [0,0,0,1,0,1,0,0,1,0,1,0];

var calender = (function(){
  var month;
  var year;
  var target;
  var call_next = function(){
    month.value++;
    if(month.value>12)
    {
      month.value = 1;
      year.value++;
    }
    change();
  }
  var call_prev = function(){
    month.value--;
    if(month.value<1)
    {
      month.value = 12;
      year.value--;
    }
    change();
  }
  var create = function(){
    
    target.className += "calender";
    // CREATING HEADER
    var temp_month = new Date().getMonth();
    temp_month++;
    var temp_year = 1900 + new Date().getYear();
    var curr_block = document.createElement("div");
    curr_block.className += "head";
    target.appendChild(curr_block);
    var prev = document.createElement("button");
    prev.innerHTML = "<i class='fa fa-caret-square-o-left head_but' aria-hidden='true'></i>";
    prev.className += "head_button";
    prev.addEventListener('click',call_prev);
    curr_block.appendChild(prev);
    var middle = document.createElement("p");
    middle.className += "title";
    middle.innerHTML = Months[temp_month] + ", " + temp_year;
    curr_block.appendChild(middle);
    var next = document.createElement("button") ;
    next.innerHTML = "<i class='fa fa-caret-square-o-right head_but' aria-hidden='true'></i>";
    next.className += "head_button";
    next.addEventListener('click',call_next);
    curr_block.appendChild(next);

    //CREATING DAYS
    curr_block = document.createElement("div");
    curr_block.className += "day_list";
    for(var i=0;i<7;i++)
    {
      var curr_el = document.createElement("div");
      curr_el.className += "days";
      var content = document.createElement("p");
      content.className += "content for-daylist";
      content.innerHTML = Days[i];
      curr_el.appendChild(content);
      curr_block.appendChild(curr_el);
    }
    target.appendChild(curr_block);

    //CREATING DATE LIST

    curr_block = document.createElement("div");
    curr_block.className += "date_list";
    var first_date = new Date(Months[temp_month] + " 01" + ', ' + temp_year);
    var first_day = first_date.getDay();
    var j=1;
    var count;
    if(temp_month==2)
    {
      if(temp_year%4 == 0  && ( temp_year%100 == 0 ? (temp_year%400==0 ? 1 : 0) : 1))
      {
        count = 29;
      }
      else
        count = 28;
    }
    else if(thirty[temp_month-1]==1)
      count = 30;
    else
      count = 31;
    for(var i=0;i<42;i++)
    {
      var curr_el = document.createElement("div");
      curr_el.className += "dates";
      var content = document.createElement("p");
      content.className += "content";
      if(first_day>0)
      {
        first_day--;
        content.innerHTML = " ";
      }
      else if(count>0)
      {
        content.innerHTML = j;
        j++;
        count--;
      }
      else
      {
        content.innerHTML = " ";
      }
      curr_el.appendChild(content);
      curr_block.appendChild(curr_el);
    }
    target.appendChild(curr_block);
  }
  var change = function(){
    var temp_month = month.value;
    var temp_year = year.value;
    while(temp_month[0]=='0')
    {
      temp_month = temp_month.substr(1);
    }
    temp_year = "000" + temp_year;
    temp_year = temp_year.substr(temp_year.length - 4);
    var date = new Date(Months[temp_month] + " 01" + ', ' + temp_year);
    var el = document.getElementById(target);
    var divs = target.children;
    //UPDATING HEADER
    divs[0].getElementsByTagName("p")[0].innerHTML = Months[temp_month] + ", " + temp_year; 

    // UPDATING DATES
    var box = divs[2];
    box = box.children;
    var first_day = date.getDay();
    var j=1;
    var count;
    if(temp_month==2)
    {
      if(temp_year%4 == 0  && ( temp_year%100 == 0 ? (temp_year%400==0 ? 1 : 0) : 1))
      {
        count = 29;
      }
      else
        count = 28;
    }
    else if(thirty[temp_month-1]==1)
      count = 30;
    else
      count = 31;
    for(var i=0;i<42;i++)
    {
      if(first_day>0)
      {
        first_day--;
        box[i].children[0].innerHTML = " ";
      }
      else if(count>0)
      {
        box[i].children[0].innerHTML = j;
        j++;
        count--;
      }
      else
      {
        box[i].children[0].innerHTML = " ";
      }
    }
  };

  var init = function(config){
    month = document.getElementById(config.monthId);
    year = document.getElementById(config.yearId);
    target = document.getElementById(config.targetId);
    var but = document.getElementById(config.buttonId);
    but.addEventListener('click',change);
    create();
  };
  return {
    init : init
  }
})();
