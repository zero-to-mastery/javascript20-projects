$( ".change" ).on("click", function()
			{
			if ( $( "body" ).hasClass( "dark" ))
			{
				$( "body" ).removeClass( "dark" );
				$( ".change" ).text( "OFF" );
			}
			else
			{
				$( "body" ).addClass( "dark" );
				$( ".change" ).text( "ON" );
			}
			if (lightImage.getAttribute('src') === "Light-Mode.png")
			{
				lightImage.setAttribute('src', "Dark-Mode.png");
				lightImage.addClass("img-toggle");
			}
			else
			{
				lightImage.setAttribute('src', "Light-Mode.png");
			}
});

/*
let lightImage = document.getElementById("lightImage");
let change = document.getElementById("change");

function changeToDark()
{
	if (lightImage.getAttribute('src') === "Light-Mode.png")
	{
		lightImage.setAttribute('src', "Dark-Mode.png");
	}
	else
	{
		lightImage.setAttribute('src', "Light-Mode.png");
	}
}
*/