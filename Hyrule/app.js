const $form = $('form');

$form.on('submit', (event) => {
	// prevent the page from refreshing
	event.preventDefault();
	//generate data from target value
	const formData = new FormData(event.target);
	// get the value from the generated data where the name value is "monster"
	const entry = formData.get('entry').toLowerCase();

	const $screen = $('#screen-left');
	const $result = $('#result');

    // emptying out the input field
    $('[name="entry"')[0].value = ""

	$.ajax(`https://botw-compendium.herokuapp.com/api/v2/entry/${entry}`)
    .then(
		(response) => {
			console.log(response);
			$screen.html(
				`<img src=${response.data.image} alt=${response.data.name}>`
			);
			$result.html(`
                <div>
                    <b>Name: ${response.data.name}</b>
                </div>
                <div>
                    <b>Description: ${response.data.description}</b>
                </div>
                <div>
                    <b>Locations: ${response.data.common_locations}</b>
                </div>
                <div>
                    <b>Drops: ${response.data.drops}</b>
                </div>
            `);
		});
});
