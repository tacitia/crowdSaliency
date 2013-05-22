crowdSaliency
=============
This project installs a Web application that lets users upload images that will be searched and analyzed by others.

## Installation
The app can be installed using the included Makefile. The steps are:

1. Edit `WEBDIR` and `TARGETDIR` variables inside the Makefile with the appropriate destinations for your server.
2. Open frontEnd/config.py and add your database credentials.
3. Run the make target:

````bash
$ make install      # installs components to your server
````
