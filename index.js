//name, phone number, email,photo

/**FUNCTION FOR POSTING */
function postContact(){
    const form=document.getElementById("postForm")
    const name =document.getElementById("name").value
    const email =document.getElementById("email").value
    const phoneNumber =document.getElementById("phoneNumber").value
    const image =document.getElementById("image").value


    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        
        fetch("https://phonebook-server-z5x4.onrender.com/contacts",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                email:email,
                number:phoneNumber,
                image:image
            })
            
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            alert("Contact has been added")
        })
        .catch(error=>console.log(error.json()))
    })
}

/**function for getting */
function getContacts(){
    fetch("https://phonebook-server-z5x4.onrender.com/contacts")
    .then(response=>response.json())
    .then(data=>displayContacts(data))
}

/**function for displaying quotes */
function displayContacts(contacts){
    const body= document.querySelector("tbody")
    contacts.forEach(contact=>{
        const row =document.createElement("tr")
        row.innerHTML=`
            <th scope="row"><img src="${contact.image}" alt="profile picture"></th>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.number}</td>
            <td><button class="btn btn-primary" id="view_${contact.id}">View Contact</button></td>
            <td><button class="btn btn-success" id="update_${contact.id}">Update Contact</button></td>
            <td><button class="btn btn-danger" id="delete_${contact.id}">Delete Contact</button></td>


        `
        body.appendChild(row)

        let id =contact.id

        /**View Button */
        const viewButton=document.getElementById(`view_${contact.id}`)
        viewButton.addEventListener("click",()=>getOneContact(id))

        /**Update Button */
        const updateButton= document.getElementById(`update_${contact.id}`)
        updateButton.addEventListener("click",()=>{
            
            /**Hide table */
            const contactsContainer = document.getElementById("contactsContainer")
            contactsContainer.style.display="none"


            /**show update form */
            updateForm.style.display="block"

            /**Add values to input fields */
            const nameInput = document.getElementById("updateName")
            const emailInput = document.getElementById("updateEmail")
            const numberInput = document.getElementById("updateNumber")
            const imageInput = document.getElementById("updateImage")

            nameInput.value=contact.name
            emailInput.value=contact.email
            numberInput.value=contact.number
            imageInput.value=contact.image

            /**Call update button and add event listener */
            const updateFormButton=document.getElementById("updateButton")
            updateFormButton.addEventListener("click",()=>updateContact(id))

            /**Call back button and add event lishtener */
            const goBackButton= document.getElementById("goBack")
            goBackButton.addEventListener("click",()=>{
                updateForm.style.display="none"
                contactsContainer.style.display="block"
            })

        })

        /**Delete button */
        const deleteButton= document.getElementById(`delete_${contact.id}`)
        deleteButton.addEventListener("click",()=>deleteQuote(id))

    })
    
}

getContacts()

function getOneContact(id){
    fetch(`https://phonebook-server-z5x4.onrender.com/contacts/${id}`)
    .then(response=>response.json())
    .then(data=>{
        const container = document.getElementById("contactDetails")
        container.className="card"
        container.innerHTML=`
        <div id="details">
        <img src="${data.image}" class="card-img-top" alt="profile picture">
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <h6 class="card-text">${data.email}</h6>
          <h6 class="card-text">${data.number}</h6>

          <a href="#" class="btn btn-primary" id="backButton">Back</a>
        </div>
        </div>
        `
         /**Back button */
        const backButton=document.getElementById("backButton")
        backButton.addEventListener("click",()=>{

            /**remove details card */
            const detailsCard=document.getElementById("details")
            detailsCard.remove()

            /**Show table */
            contactsContainer.style.display="block"


        })
    })

    /**Hiding table */
    const contactsContainer = document.getElementById("contactsContainer")
    contactsContainer.style.display="none"

}

/**Hide update form */
const updateForm = document.getElementById("updateForm")
updateForm.style.display="none"

function updateContact(id){
    updateForm.addEventListener("submit",(e)=>{
        e.preventDefault()

        const nameInput = document.getElementById("updateName").value
        const emailInput = document.getElementById("updateEmail").value
        const numberInput = document.getElementById("updateNumber").value
        const imageInput = document.getElementById("updateImage").value

        fetch(`https://phonebook-server-z5x4.onrender.com/contacts/${id}`, {
            method:"PUT",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                name:nameInput,
                email:emailInput,
                number:numberInput,
                image:imageInput
            })
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            
            alert("Contact has been updated")
        })
        .catch(error=>console.log(error))

        
    })
    
}

function deleteQuote(id){
    fetch(`https://phonebook-server-z5x4.onrender.com/contacts/${id}`,{
        method:"DELETE"
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        alert("Contact has been deleted")
    })
    .catch(error=>console.log(error))
}