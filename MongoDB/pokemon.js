<script>
    $(document).ready(function(){
    	$.get("https://pokeapi.co/api/v2/pokemon/4/", function(data){
                console.log("Received data from API", data);
    		var mypokemon = data.name;
    	})
    })
</script>