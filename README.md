# sfmoviemap

A map to find the locations of your favorite films that were shot in SF!

Link to live app at [moviemap.xyz](http://moviemap.xyz)

Built with JavaScript and jQuery.

I made MovieMap so people can find out what movies were made in San Francisco and then visit the locations where they were filmed. I got the movie names and location data from [SF OpenData](https://data.sfgov.org/). I am running my own nginx server on a [DigitalOcean](https://www.digitalocean.com/) droplet. I used [Apiary](http://docs.themoviedb.apiary.io/) to access the movie poster database API. I used vanilla Javascript and jQuery to build MovieMap. I loaded the data into the cache to optimize the app for fast search capabilities and scaling. I took a mobile-first approach to make the app responsive. Stay tuned for new upcoming features!