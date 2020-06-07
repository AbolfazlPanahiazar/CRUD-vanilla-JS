renderTable();
function removeContact(id) {
  let contactList = JSON.parse(localStorage.getItem("contactList"));
  contactList = contactList.filter((item) => item.id != id);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  renderTable();
}

function renderTable() {
  // Get the data from localstorage
  const contactList = JSON.parse(localStorage.getItem("contactList"));

  // If program runs for the first time or the table is not exist
  if (!contactList) {
    localStorage.setItem("contactList", JSON.stringify([]));
    return;
  }

  // Get the existed table-body from html
  const tbody2 = document.getElementsByTagName("tbody");

  // Remove the existed table-body form html
  if (tbody2.length > 0) {
    tbody2[0].remove();
  }

  // Get the table from html
  const table = document.getElementById("contact_table");

  // Create new table-body
  const tbody = document.createElement("TBODY");

  // Inject contactList into td, tr tags and apped every one into our tbody
  contactList.map((contact) => {
    const tr = document.createElement("TR");
    tr.innerHTML = `<td>${contact.id}</td><td>${contact.name}</td><td>${contact.lastName}</td>
        <td>${contact.phone}</td><td>${contact.email}</td><td>${contact.address}</td>
        <td>${contact.birthday}</td><td>${contact.details}</td>
        <td> <button onclick="deleteContact(${contact.id})" class="btn back-red text-moon"> <i class='fa fa-trash'></i></button>
        <button onclick="edit(${contact.id})" class="btn back-green text-moon"> <i class='fa fa-edit'></i></button></td>`;
    tbody.appendChild(tr);
  });

  // Append our table-body into the table in html
  table.appendChild(tbody);
}

// When click on Add button
function showForm() {
  const form = document.getElementById("form");
  form.classList.add("show");
}

// When form submit
function hideForm(e) {
  const el = document.getElementById("form");
  el.classList.remove("show");
}

// Form submit listener
document.getElementById("contact_form").addEventListener("submit", (event) => {
  event.preventDefault();
  // Get contactList from localstorge
  let contactList = JSON.parse(localStorage.getItem("contactList"));
  // Create new contact data obj. from form by FormData constructor function
  const newContact = new FormData(event.target);
  // Create real contact object
  const new_contact = new Object();
  for (item of newContact.entries()) {
    new_contact[item[0]] = item[1];
  }

  const contact = contactList.find((item) => item.id == new_contact.id);
  if (contact) {
    contactList = contactList.map((item) => (item.id == new_contact.id ? new_contact : item));
  } else {
    // Push it into cotact list and updated list into localstorage
    contactList.push(new_contact);
  }
  localStorage.setItem("contactList", JSON.stringify(contactList));
  // Update view of html
  hideForm();
  renderTable();
  event.target.reset();
});

// Delete Contact function
const deleteContact = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#14C2A3",
    cancelButtonColor: "#E82D62",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      removeContact(id);
      Swal.fire({
        title: "Deleted!",
        text: "Your contact had been deleted.",
        icon: "success",
        confirmButtonColor: "#14C2A3",
        confirmButtonText: "Ok",
      });
    }
  });
};

function edit(id) {
  const contactList = JSON.parse(localStorage.getItem("contactList"));
  const contact = contactList.find((item) => item.id == id);
  showForm();
  document.getElementById("id_id").value = contact.id;
  document.getElementById("id_name").value = contact.name;
  document.getElementById("id_last_name").value = contact.lastName;
  document.getElementById("id_phone").value = contact.phone;
  document.getElementById("id_email").value = contact.email;
  document.getElementById("id_address").value = contact.address;
  document.getElementById("id_birthday").value = contact.birthday;
  document.getElementById("id_details").value = contact.details;
}
