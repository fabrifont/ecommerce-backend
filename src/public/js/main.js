const socket = io("http://localhost:8080");

socket.on("update-list", (data) => {
	const list = document.querySelector("body");
	list.innerHTML = data;
});
