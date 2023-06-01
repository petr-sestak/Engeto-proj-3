export function display() {
  //Check if there are data in local storage.
  let data = new Array();
  if (localStorage.getItem("dataFetch")) {
    data = JSON.parse(localStorage.getItem("data"));
  }

  const content = document.getElementById("content");
  content.className = "container";
  content.innerHTML = "";

  data.forEach((element) => {
    const idCard = document.createElement("div");
    idCard.className = "idCard";
    let strSearch = document.getElementById("btnFilter").value.toLowerCase();
    if (document.getElementById("btnFilter").value) {
      if (!element.name.toLowerCase().includes(strSearch)) {
        return;
      }
    }
    const img = document.createElement("img");
    let linkImg = "https://robohash.org/" + element.name;
    img.src = linkImg;
    idCard.appendChild(img);

    const arr = [
      element.name,
      element.company.name,
      element.company.bs,
      element.phone,
    ];
    arr.forEach((part) => {
      const elmDiv = document.createElement("div");
      elmDiv.textContent = part;
      elmDiv.className = "textItem";
      idCard.appendChild(elmDiv);
    });

    const elmDivWeb = document.createElement("a");
    elmDivWeb.href = "http://" + element.website;
    elmDivWeb.text = element.website;
    elmDivWeb.target = "_blank_";
    idCard.appendChild(elmDivWeb);

    content.appendChild(idCard);
  });
}
