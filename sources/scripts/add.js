var form = document.getElementById('new-recipe');

form.addEventListener('submit', function (e) {
	e.preventDefault();

	var recipeName = document.getElementById('name').value;
	var recipeDescription = simplemde.value();
	var recipeSklad = Array.from(document.getElementsByName('ingredients[]'));
	var flag = true;
	const regex = new RegExp('^[0-9]+([.,][0-9]+)*$')
	
	for(var i=0; i < recipeSklad.length; i++){
		var temp = recipeSklad[i].value.split(" ");
		var nazwa = temp[2];
//dluzsza nazwa niz 1 slowo
		if(temp.length > 3){
			for(var j=3; j < temp.length; j++){
				nazwa += (" "+temp[j]);
			}
		}
//tworzenie obiektu
		recipeSklad[i] = {
			"quantity": temp[0],
			"unit": temp[1],
			"name": nazwa
		}
//validacja
		if(!regex.test(recipeSklad[i].quantity)){
			flag = false;
			document.getElementById('alert-ingredients').innerHTML = "Żle wypełnione składniki podaj liczbe";
			break;
		}
		if(!(recipeSklad[i].unit && recipeSklad[i].name)){
			flag = false;
			document.getElementById('alert-ingredients').innerHTML = "Żle wypełnione składniki za mało danych";
			break;
		}
	}
	if(recipeName.length < 3){
		document.getElementById('alert-name').innerHTML = "Za krótka nazwa min 3 znaki";
	}
//dodanie
	if(flag){
		var recipe = {
		name: recipeName,
		description: recipeDescription,
		ingredients: recipeSklad
	};

	var request = new XMLHttpRequest();

	request.addEventListener('load', function (response) {
		location = 'index.html';
	});
	request.open('POST', API + '/recipe');
	request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	request.send(JSON.stringify(recipe));
	}
});

var simplemde = new SimpleMDE({
	element: document.getElementById('description'),
	spellChecker: false,
	toolbar: [
		'bold',
		'italic',
		'heading-3',
		'unordered-list',
		'ordered-list'
	]
});

//dodawanie wiecej skladnikow
document.getElementById('add').addEventListener('click', function (e) {
	var listElementTemplate = document.getElementById('ing'),
	listElement = listElementTemplate.cloneNode(true),
	ingredients = document.getElementById('ingredients');
	ingredients.appendChild(listElement);
	ingredients.lastChild.id='';
	ingredients.lastChild.className='input-ingredient';
});

//odejmowanie skladnikow
document.getElementById('rem').addEventListener('click', function(e){
	var ingredientsList = document.getElementById('ingredients');
	ingredientsList.lastChild.remove();
});