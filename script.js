var url = 'https://codepen.io/ravinadhamani/pen/jOZOqpd'

var tableData = document.getElementById("table-data1")
var infoWrapper = document.getElementById("info-wrapper")
var userData = []
var inputElement = document.getElementById("search-box")

function rowClicked(id) {


    var previousActive = document.getElementsByClassName("active")[0]
    previousActive.classList.remove("active")
    //console.log(previousActive)

    var activeUser = document.getElementById("tr"+id)
    activeUser.classList.add("active")
    //console.log(activeUser)
    
    var activeUserDetails = userData.find((user, i) => {
        if (user.id == id) {
            return true
        }
        //console.log(activeUserDetails)
    })
    var infoWrapper = document.getElementById("info-wrapper")
    infoWrapper.innerHTML=
    `
                    <h1>Details</h1>
                    <p>Click on a table item to get detailed information</p>
                    <div id="content${activeUserDetails.id} class="info-content">
                    <div><b>User selected:</b> ${activeUserDetails.firstName} ${activeUserDetails.lastName}</div>
                    <div>
                    <b>Description: </b>
                    <textarea cols="50" rows="5" readonly>
                    ${activeUserDetails.description}
                    </textarea>
                    </div>
                    <div><b>Address:</b>${activeUserDetails.address.streetAddress}</div>
                    <div><b>City:</b> ${activeUserDetails.address.city}</div>
                    <div><b>State:</b> ${activeUserDetails.address.state}</div>
                    <div><b>Zip:</b> ${activeUserDetails.address.zip}</div>
            </div>
    `
}

$.get(url, function (response) {
    userData = response
    response.map((user, i) => {
        tableData.innerHTML += `
            <tr id="tr${user.id}" onclick="rowClicked('${user.id}')" class="data-row ${i == 2 ? `active` : ""}">
                <td class="column1">${user.id}</td>
                <td class="column2">${user.firstName}</td>
                <td class="column3">${user.lastName}</td>
                <td class="column4">${user.email}</td>
                <td class="column5">${user.phone}</td>
            </tr>`
        //console.log(user)
        if(i==2){   
                infoWrapper.innerHTML=`
                    <h1>Details</h1>
                    <p>Click on a table item to get detailed information</p>
                    <div id="content${user.id} class="info-content">
                    <div><b>User selected:</b> ${user.firstName} ${user.lastName}</div>
                    <div>
                    <b>Description: </b>
                    <textarea cols="50" rows="5" readonly>
                    ${user.description}
                    </textarea>
                    </div>
                    <div><b>Address:</b>${user.address.streetAddress}</div>
                    <div><b>City:</b> ${user.address.city}</div>
                    <div><b>State:</b> ${user.address.state}</div>
                    <div><b>Zip:</b> ${user.address.zip}</div>
            </div>
             `
            }
    })
})

function inputChanged()
{
    var userFirstName= inputElement.value
    var filteredUsers= userData.filter((user,i) => {
        if(user.firstName.toLowerCase().includes(userFirstName.toLowerCase()) || 
        user.email.toLowerCase().includes(userFirstName.toLowerCase())){
            return true
        }
        
    })
 
    

    tableData.innerHTML = ``
    let infoContentDiv= document.getElementsByClassName("info-content")[0]
    //console.log(infoContentDiv.id)
    
    filteredUsers.map((user,i) => {
        tableData.innerHTML+=
        `
        <tr id="tr${user.id}" onclick="rowClicked('${user.id}')" class="data-row ">
        <td class="column1">${user.id}</td>
        <td class="column2">${user.firstName}</td>
        <td class="column3">${user.lastName}</td>
        <td class="column4">${user.email}</td>
        <td class="column5">${user.phone}</td>
    </tr>
        `
    })
    
}
