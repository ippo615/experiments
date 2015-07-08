# Muse Brainwave Stuff

## Main Thing

The `muse` folder has the interesting stuff:

First, connect to the Muse but replace `00:00:00:FF:FF:FF` with the mac
address of your Muse:

	muse-io --device 00:00:00:FF:FF:FF --osc osc.udp://localhost:5001,osc.udp://localhost:5002

Then start the OSC server which listens for Muse data:

	python ./muse/library/osc_writer/osc_dict.py

All that python script does is dump Muse data into a json format. We'll
then serve that data to a html page but we need a server to serve that
content:

	cd muse
	python -m SimpleHTTPServer

You can then view live data on http://localhost:8000

Note: you may need to move the `osc_dict.py` script to a different
location (`./muse/`) because the data used by the server is in
`data/...`.

## Additional Notes

`01-index.html`, `01-main.js`, `02-index.html`, and `02-main.js` are
just there as simple js examples in case `index.html` and `main.js`
are not clear.

The `library` folder also has some other examples that show other ways
to access/manipulate Muse data.
