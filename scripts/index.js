


(function() {
		var blogData = [];
		var errors = {};	

		function fetchData(url) {
			return new Promise(function(resolve, reject) {
				fetch(url)
				.then(function(response) {
					var result = response.json()
					return result;
				})
				.then(function(res) {
					blogData = blogData.concat(res);
					resolve(blogData)
				})
				.catch(function(err) {
					errors.message = err.message;
					errors.status = err.status;
					reject(new Error('Something went wrong!'))
				});
				})
		}

		// <div class="blog-item">
		//		<p>Paragraph 1<p>
		// 		<h3>Title</h3>
		// 		<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus error consequatur ipsam aspernatur quam nesciunt nobis eaque, minus, odio eligendi iusto tenetur molestiae, similique et voluptatum. Possimus laudantium pariatur tempore!</p>
		// 		<button type="submit">Delete</button>
		// </div>

		fetchData('./data.json').then(function(response) {
			// response = [{}, {}, {}, {}, {}]
			// insert all data represented by response
			var parent = document.getElementsByClassName('blog')[0];
			for (var i = 0; i <= response.length - 1; i++) {
				// create <div class="blog-item">
				var blogItem = document.createElement('div');
				blogItem.className = 'blog-item';
				// create <h3>Title</h3>
				var newParagraph = document.createElement('p');
				var index = i + 1;
				newParagraph.innerHTML = 'Paragraph' + Number(i + 1);				
				var title = document.createElement('h3');
				title.innerHTML = response[i].title;
				// create <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus error consequatur ipsam aspernatur quam nesciunt nobis eaque, minus, odio eligendi iusto tenetur molestiae, similique et voluptatum. Possimus laudantium pariatur tempore!</p>
				var paragraph = document.createElement('p');
				paragraph.innerHTML = response[i].description;
				var button = document.createElement('button');
				button.type = 'button';
				button.innerHTML = 'Change color';
				blogItem.append(newParagraph);
				blogItem.append(title);
				blogItem.append(paragraph);
				blogItem.append(button);
				parent.append(blogItem); 
				// create <button type="submit">Delete</button>
				//TODO next time!
			}
		}).then(function(){
			var blogItems = document.querySelectorAll('.blog-item');
			Array.from(blogItems).forEach(function(item) {
				var button = item.querySelector('button');
				console.log(button)
				button.addEventListener('click', function() {
					item.classList.toggle("blog-item--colored")
				})
		 });
		})
	}
 )();

 