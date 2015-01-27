# daux.io Documentation Generator

Start the environmen by running:

	vagrant up

Then access it with:

	vagrant ssh

Build and serve daux.io's own documentation with:

	cd daux.io
	php generate.php global.json ../output

	cd ../output
	python -m SimpleHTTPSevrver

View it on http://localhost:8000
