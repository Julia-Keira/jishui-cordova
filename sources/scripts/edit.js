// Wyświetlanie elementów na formularzu

var urlParams = new URLSearchParams(location.search);
var id = urlParams.get('id');

var request = new XMLHttpRequest();

request.addEventListener('load', function (response) {
	var recipe = JSON.parse(response.target.response);
	console.log(recipe.ingredients);
	var ingredients = recipe.ingredients.split("},{");

	for(var i=0; i < ingredients.length; i++){
		console.log(ingredients.length);
		var temp = ingredientsshow(ingredients[i]);
		var listElementTemplate = document.getElementById('ing');
		var listElement = listElementTemplate.cloneNode(true);
		var ingredients = document.getElementById('ingredients');
		ingredients.appendChild(listElement);
		var last = ingredients.lastChild;

		last.id='';
		last.className='input-ingredient';
		last.value = temp;
		console.log(i);
	}

	document.getElementsByClassName('back')[0].href = 'details.html?id=' + id;
	document.getElementById('name').value = recipe.name;
	document.getElementById('description').value = recipe.description;
	simplemde.value(recipe.description);
});
request.open('GET', API + '/recipe/' + id);
request.send();

// Edycja formularza

var form = document.getElementById('edit-recipe');

form.addEventListener('submit', function (e) {
	e.preventDefault();

	var recipeName = document.getElementById('name').value;
	var recipeDescription = simplemde.value();

	var recipe = {
		name: recipeName,
		description: recipeDescription,
		ingredients: []
	};

	var request = new XMLHttpRequest();

	request.addEventListener('load', function (response) {
		location = 'details.html?id=' + id;
	});
	request.open('PUT', API + '/recipe/' + id);
	request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	request.send(JSON.stringify(recipe));
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

//'czyszczenie stringa'
function ingredientsshow(ingredient){
	ingredient = ingredient.replace(/[{}",:]/g, '');
	ingredient = ingredient.replace("quantity", '');
	ingredient = ingredient.replace("unit", ' ');
	ingredient = ingredient.replace("name", ' ');
	ingredient = ingredient.replace("[", '');
	ingredient = ingredient.replace("]", '');
	return ingredient;
}