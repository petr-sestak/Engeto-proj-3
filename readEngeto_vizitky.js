class readEngeto {
  constructor() {
    this.data = new Array();
    this.readData("https://jsonplaceholder.typicode.com/users");
    const btnFilter = document.getElementById("btnFilter");
    btnFilter.addEventListener("input", this.populate);
  }

  async readData(url) {
    const response = await fetch(url);
    if (response.status === 200) {
      const received = await response.json();
      received.forEach((element) => {
        this.data.push(element);
      });
    } else {
      alert("The data was not read!");
    }
    this.populate();

    //Storing the fetch data into local storage.
    let str = JSON.stringify(this.data);
    localStorage.setItem("data", str);
    localStorage.setItem("dataFetch", true);
  }

  populate() {
    if (localStorage.getItem("dataFetch")) {
      this.data = new Array();
      this.data = JSON.parse(localStorage.getItem("data"));
    }
    const content = document.getElementById("content");
    content.className = "container";
    content.innerHTML = "";

    this.data.forEach((element) => {
      const idCard = document.createElement("div");
      idCard.className = "idCard";
      if (document.getElementById("btnFilter").value) {
        if (
          !element.name
            .toLowerCase()
            .includes(document.getElementById("btnFilter").value)
        ) {
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
}
