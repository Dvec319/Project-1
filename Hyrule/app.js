const $form = $('form');
const $screen = $('#screen-left');
const $name = $('.name');
const $description = $('.description');
const $locations = $('.locations');
const $drops = $('.drops');
const $mobileScreen = $('#mobile-screen');
const $dialog = $('#error');

$form.on('submit', (event) => {
	// prevent the page from refreshing
	event.preventDefault();
	//generate data from target value
	const formData = new FormData(event.target);
	// get the value from the generated data where the name value is "monster"
	const entry = formData.get('entry').toLowerCase();

    // emptying out the input field
    $('[name="entry"]')[0].value = ""
	$('[name="entry"]')[1].value = "";

	$.ajax(`https://botw-compendium.herokuapp.com/api/v2/entry/${entry}`)
    .then(
		(response) => {
			console.log(response);
			$screen.html(
				`<img src=${response.data.image} alt=${response.data.name}>`
			);
			$name.html(`Name: ${response.data.name}`)
            $description.html(`Description: ${response.data.description}`)
            if (response.data.common_locations === null) {
                $locations.html("Locations: N/A")
            } else {$locations.html(`Locations: ${response.data.common_locations}`)}
            if (response.data.drops === undefined) {
                $drops.html("Drops: N/A")
            } else {$drops.html(`Drops: ${response.data.drops}`)}
			$mobileScreen.html(
				`<img src=${response.data.image} alt=${response.data.name}>`
			);
		})
		.catch(() => {
			$screen.empty()
			$name.empty()
			$description.empty()
			$locations.empty()
			$drops.empty()
			alert(`${entry} isn't in this API. Please try searching for something else!`)
		})
});
