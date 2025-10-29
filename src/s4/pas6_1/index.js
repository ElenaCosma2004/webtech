const apiUrl = "http://localhost:8000/api/";

async function get(url) {
  return (await axios.get(url)).data;
}

async function loadTable() {
  let data = await get(apiUrl + "getList");
  let tableDiv = document.getElementById("tableData");

  if (!data || !tableDiv) {
    return;
  }

  let myHtmlCode = [];
  myHtmlCode.push("<table>");
  myHtmlCode.push("<thead>");
  myHtmlCode.push("<tr> <th hidden> Id </th> <th> Name </th> <th> Age </th>");
  myHtmlCode.push("</thead>");
  myHtmlCode.push("<body>");

  for (let item of data) {
    myHtmlCode.push(
      `<tr> <td hidden> ${item.id} </td> <td> ${item.name}  </td> <td> ${item.age}  </td>`
    );
  }

  myHtmlCode.push("</tbody>");
  myHtmlCode.push("</table>");

  tableDiv.innerHTML = myHtmlCode.join("");
}
loadTable();
