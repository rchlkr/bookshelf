let myLibrary = localStorage.getItem("books")
	? JSON.parse(localStorage.getItem("books"))
	: [];

localStorage.setItem("books", JSON.stringify(myLibrary));
const data = JSON.parse(localStorage.getItem("books"));

//constructor function
function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

const submit = document.getElementById("submit");
submit.addEventListener("click", addBookToLibrary);
const readRadio = document.getElementById("read");
const unreadRadio = document.getElementById("unread");
function addBookToLibrary() {
	//populate constructor function values from input fields
	let newTitle = document.getElementById("title").value;
	let newAuthor = document.getElementById("author").value;
	let newPages = document.getElementById("pages").value;
	let newRead = document.getElementById("read");

	//determine readstatus based on checked/unchecked
	if (newRead.checked === true) {
		newRead.value = "&#x2714;";
	} else {
		newRead.value = "";
	}

	//create new book object, add it to myLibrary & create display card
	let newBook = new Book(newTitle, newAuthor, newPages, newRead.value);
	myLibrary.push(newBook);
	localStorage.setItem("books", JSON.stringify(myLibrary));

	createCard(newBook);

	//clear text fields after book added
	document.getElementById("title").value = "";
	document.getElementById("author").value = "";
	document.getElementById("pages").value = "";
	readRadio.checked = false;
	unreadRadio.checked = false;
}

const section = document.querySelector("#section");
function createCard(newBook) {
	//create card when new book added, populate it with book details
	const card = document.createElement("article");
	section.appendChild(card);
	card.classList.add("card");
	card.innerHTML = `<strong>${newBook.title}</strong><br><br>${newBook.author}<br><br>${newBook.pages} pages<br><br>${newBook.read}`;
	card.style.wordWrap = "break-word";
	card.style.color = "hsl(0, 0%, 45%)";

	//set IDs for each card
	let setCardIds = () => {
		let cardId = document.getElementsByClassName("card");
		for (i = 0; i < cardId.length; i++) {
			cardId[i].id = i;
		}
	};
	setCardIds();

	//create remove/read buttons, default visibility is hidden
	let remove = document.createElement("button");
	let markRead = document.createElement("button");
	remove.classList.add("remove");
	markRead.classList.add("markread");
	card.appendChild(remove);
	card.appendChild(markRead);
	remove.textContent = "remove";
	markRead.innerHTML = "&#x2714;";
	remove.style.visibility = "hidden";
	markRead.style.visibility = "hidden";

	//when mouse hovers over card, show remove/read
	let showOptions = () => {
		setCardIds(); //updates card ids after removing book
		let index = card.id;
		myLibrary.forEach((book) => {
			if (myLibrary[index].read === "&#x2714;") {
				remove.style.visibility = "visible";
				markRead.style.visibility = "hidden";
			} else {
				remove.style.visibility = "visible";
				markRead.style.visibility = "visible";
			}
		});
		//always hide checkmark if book is already read
	};
	//when mouse exits card, hide remove/edit
	const hideOptions = () => {
		remove.style.visibility = "hidden";
		markRead.style.visibility = "hidden";
	};

	//remove button deletes card from section and myLibrary
	let removeBook = () => {
		let index = card.id;
		myLibrary.splice(index, 1);
		remove.parentElement.remove();
	};
	//clicking read changes card value and array value
	let readStatus = document.getElementById("readStatus");
	let changeStatus = () => {
		let index = card.id;
		myLibrary[index].read = "&#x2714;";
		card.innerHTML = `<strong>${newBook.title}</strong><br><br>${newBook.author}<br><br>${newBook.pages} pages<br><br>&#x2714`;
	};

	card.addEventListener("mouseover", showOptions);
	card.addEventListener("mouseout", hideOptions);
	remove.addEventListener("click", removeBook);
	markRead.addEventListener("click", changeStatus);
}

//create card for each book in localStorage
data.forEach((book) => {
	createCard(book);
});

//when addbook is clicked, book info popup appears
let addBtn = document.getElementById("addbook");
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".closebutton");

addBtn.addEventListener("click", showModal);
closeButton.addEventListener("click", showModal);
window.addEventListener("click", windowOnClick);

function showModal() {
	modal.classList.toggle("showmodal");
}

function windowOnClick(event) {
	if (event.target === modal) {
		showModal();
	}
	if (event.target === submit) {
		showModal();
	}
}

//introDiv appears on page load, disappears after addbook is clicked
let introDiv = document.getElementById("arrowdiv");
window.addEventListener("load", function () {
	//hide if localStorage is populated
	if (myLibrary.length > 0) {
		introDiv.style.visibility = "hidden";
	} else {
		introDiv.style.visibility = "visible";
	}
});
addBtn.addEventListener("click", function () {
	introDiv.style.visibility = "hidden";
});

//credit info appears on hover of info icon, disappears on mouseout
const info = document.getElementById("credit");
const flatIcon = document.getElementById("flaticon");
info.addEventListener("mouseover", function () {
	flatIcon.style.visibility = "visible";
});
info.addEventListener("mouseout", function () {
	flatIcon.style.visibility = "hidden";
});

/*
ideas:

	only show title on small card, clicking expands card to show all details
	
	group by read/unread
	
  currently reading option
*/
