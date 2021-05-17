var urlParams = new URLSearchParams(location.search);
var id = urlParams.get('id');

var request = new XMLHttpRequest();

request.addEventListener('load', function (response) {
	var recipe = JSON.parse(response.target.response);

	document.getElementsByTagName('h2')[0].innerText = recipe.name;
	document.getElementsByClassName('edit')[0].href = 'edit.html?id=' + id;
	var ingredients = recipe.ingredients.split("},{");

	for(var i=0; i < ingredients.length; i++){
		ingredientsshow(ingredients[i]);
	}
	if (recipe.description !== "") {
		document.getElementsByClassName('description')[0].innerHTML = markdown.toHTML(recipe.description);
	}
	else {
		document.getElementsByClassName('description')[0].innerHTML = '<p>Wybrany przepis nie posiada jeszcze opisu.</p>';
	}
});
request.open('GET', API + '/recipe/' + id);
request.send();

function ingredientsshow(ingredient){
		ingredient = ingredient.replace(/[{}",:]/g, '');
		ingredient = ingredient.replace("quantity", '');
		ingredient = ingredient.replace("unit", ' ');
		ingredient = ingredient.replace("name", ' ');
		ingredient = ingredient.replace("[", '');
		ingredient = ingredient.replace("]", '');
	var listElementTemplate = document.getElementById('ingredients-template'),
		listElement = listElementTemplate.cloneNode(true);
		document.getElementById("ingredients").appendChild(listElement);
		listElement.id = "";
		listElement.innerText = ingredient;
}
