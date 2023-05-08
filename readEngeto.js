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

    //Title generate
    const arrTitle = ["logo", "Fulname", "login", "e-mail", "address", "geo"];
    arrTitle.forEach((element) => {
      const elmTitle = document.createElement("div");
      elmTitle.innerHTML = element;
      elmTitle.className = "title";
      content.appendChild(elmTitle);
    });

    this.data.forEach((element) => {
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
      img.className = "gridItem";
      content.appendChild(img);

      const arr = ["name", "username", "email"];
      arr.forEach((part) => {
        const elmDiv = document.createElement("div");
        elmDiv.textContent = element[part];
        elmDiv.className = "gridItem";
        content.appendChild(elmDiv);
      });

      const elmDiv = document.createElement("div");
      elmDiv.className = "gridItem";
      elmDiv.classList.add("addrContainer");
      const addrParts = ["street", "suite", "city", "zipcode"];
      addrParts.forEach((part) => {
        const elmDivAddrPart = document.createElement("div");
        elmDivAddrPart.classList.add("addrRightItem");
        const elmDivAddrName = document.createElement("div");
        elmDivAddrName.classList.add("addrLeftItem");
        elmDivAddrPart.textContent = ": " + element.address[part];
        elmDivAddrName.textContent = part;
        elmDiv.appendChild(elmDivAddrName);
        elmDiv.appendChild(elmDivAddrPart);
      });
      content.appendChild(elmDiv);

      //Geo location
      const elmDivGeo = document.createElement("div");
      elmDivGeo.className = "geoContainer";
      elmDivGeo.classList.add("gridItem");
      const geoParts = ["lat", "lng"];
      geoParts.forEach((part) => {
        const elmDivGeoPart = document.createElement("div");
        const elmDivGeoName = document.createElement("div");
        elmDivGeoPart.textContent = element.address.geo[part];
        elmDivGeoName.textContent = part + ": ";
        elmDivGeo.appendChild(elmDivGeoName);
        elmDivGeo.appendChild(elmDivGeoPart);
      });
      content.appendChild(elmDivGeo);
    });
  }
}
