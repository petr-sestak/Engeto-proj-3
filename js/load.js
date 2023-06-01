import { display } from "./display.js";

export const LoadData = (url) => {
  localStorage.clear();
  readUrl(url);

  const btnFilter = document.getElementById("btnFilter");
  btnFilter.addEventListener("input", display);
};

async function readUrl(url) {
  const data = new Array();
  const response = await fetch(url);
  if (response.status === 200) {
    const received = await response.json();
    received.forEach((element) => {
      data.push(element);
    });
  } else {
    alert("The data was not read!");
  }
  let str = JSON.stringify(data);
  localStorage.setItem("data", str);
  localStorage.setItem("dataFetch", true);
  display();
}
