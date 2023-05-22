$(".search-button").on("click", function () {
  $.ajax({
    url:
      "https://www.omdbapi.com/?apikey=b64942e5&s=" + $(".input-keyword").val(),
    success: (results) => {
      const movies = results.Search;
      let cards = "";
      movies.forEach((m) => {
        cards += showCards(m);
      });
      $(".movie-container").html(cards);

      $(".detail-button").on("click", function () {
        $.ajax({
          url:
            "https://www.omdbapi.com/?apikey=b64942e5&i=" +
            $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = showDetails(m);
            $(".modal-body").html(movieDetail);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });

  function showCards(m) {
    return `<div class="col-md-4 my-3">
		          <div class="card">
		            <img class="card-img-top" src="${m.Poster}">
		            <div class="card-body">
		              <h5 class="card-title">${m.Title}</h5>
		              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
		              <a href="#" class="btn btn-primary detail-button" data-toggle="modal" data-target="#modaDetailMovie" data-imdbid="${m.imdbID}">Show Details</a>
		            </div>
		          </div>
		        </div>`;
  }

  function showDetails(m) {
    return `<div class="container-fluid">
	              <div class="row">
	                <div class="col-md-4">
	                  <img src="${m.Poster}" class="img-fluid">
	                </div>
	                <div class="col-md">
	                  <ul class="list-group">
	                    <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
	                    <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
	                    <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
	                    <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
	                    <li class="list-group-item"><strong>Plot : </strong> <br>${m.Plot}</li>
	                  </ul>
	                </div>
	              </div>
	            </div>`;
  }
});
