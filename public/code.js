(function(){

	const app = document.querySelector(".app");
	const socket = io();
    
	let uname;

	app.querySelector(".join-screen #join-user").addEventListener("click",function(){
		let username = app.querySelector(".join-screen #username").value;
		if(username.length == 0){
			return;
		}
		socket.emit("newuser",username);
		uname = username;
		app.querySelector(".join-screen").classList.remove("active");
		app.querySelector(".chat-screen").classList.add("active");
	});

	app.querySelector(".chat-screen #send-message").addEventListener("click",function(){
		let message = app.querySelector(".chat-screen #message-input").value;

		if(message.length  == 0){
			return;
		}
		else{
		

		renderMessage("my",{
			username:uname,
			text:message
		});
		socket.emit("chat",{
			username:uname,
			text:message
		});
		app.querySelector(".chat-screen #message-input").value = "";
		
	}
	});

	app.querySelector(".chat-screen #exit-chat").addEventListener("click",function(){
		socket.emit("exituser",uname);
		window.location.href = window.location.href;
	});

	socket.on("update",function(update){
		renderMessage("update",update);
	});
	
	socket.on("chat",function(message){
		renderMessage("other",message);
	});

	function renderMessage(type,message){
		let messageContainer = app.querySelector(".chat-screen .messages");
		if(type == "my"){
			let el = document.createElement("div");
			el.setAttribute("class","message my-message");
			el.innerHTML = `
				<div>
					<div id="name">You</div>
					<div id="text1">${message.text}</div>
				</div>
				`;
			messageContainer.appendChild(el);
		    if(	document.getElementById("message-input").style.fontWeight == "bold")
			{
				el.style.fontWeight="bold";

			}
			if(document.getElementById("message-input").style.fontStyle == "italic")
			{
				el.style.fontStyle="italic";


			}
			if(document.getElementById("message-input").style.textDecoration == "line-through")
			{
				document.getElementById("text1").style.textDecoration="line-through";


			}


			
		} else if(type == "other"){
			let el = document.createElement("div");
			el.setAttribute("class","message other-message");
			el.innerHTML = `
				<div>
					<div id="name">${message.username}</div>
					<div id="text2">${message.text}</div>
				</div>
			`;

			messageContainer.appendChild(el);
			if(a1==1)
			{
				el.style.fontWeight="bold";

			}
			if(a2 == 1)
			{
				el.style.fontStyle="italic";
			}

			
		} else if(type == "update"){
			let el = document.createElement("div");
			el.setAttribute("class","update");
			el.innerText = message;
			messageContainer.appendChild(el);
			
		}
		// scroll chat to end
		messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
	}

})();
a1=0,a2=0,a3=0;
function f1() {
    //function to make the text bold using DOM method
	if(a1==0)
   {
	document.getElementById("message-input").style.fontWeight = "bold";
	a1=1;
   }
   else if(a1==1){
	document.getElementById("message-input").style.fontWeight = "normal";
	a1=0;
   }

}
function f2() {
    //function to make the text bold using DOM method
	if(a2==0)
   {
	document.getElementById("message-input").style.fontStyle="italic";
	a2=1;
   }
   else if(a2==1){
	document.getElementById("message-input").style.fontStyle = "normal";
	a2=0;
   }

}

function f3() {
    //function to make the text bold using DOM method
	if(a3==0)
   {
	document.getElementById("message-input").style.textDecoration="line-through";
		a3=1;
   }
   else if(a2==1){
	document.getElementById("message-input").style.textDecoration="none" ;
	a3=0;
   }

}
