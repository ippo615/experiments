# Steaming Video to a Web Page

Maybe you use a laptop as a server and want to stream the video from
its webcam to a webpage. This explains how to do that with VLC and a
simple webpage.

## Testing the Webcam in VLC

Note: this step is optional but it is useful to know if your webcam
works. We'll start with a graphical version but later we'll use the
command line. Launch VLC and click `Media / Open Capture Device`. Set
the capture mode to `Video camera`. For me the video and audio device 
names were `/dev/video0` and `hw0,0` respectively, you may have
different choices depending on your setup. Click `Play`, you should see
the view from the webcam.

## Streaming from the Graphical Interface

In VLC's interface click `Media / Stream` then setup whatever you want
to stream. Assuming you want to stream your webcam, in the `Capture
Device` tab, set it up to work with your webcam: Set the capture mode
to `Video camera`. For me the video and audio device names were
`/dev/video0` and `hw0,0` respectively, you may have different choices
depending on your setup.

Click `Stream` and work your way through the wizard.

1. The source should be setup correctly, for me it was
   `v4l2:///dev/video0`. Click Next.
2. In the `New desintation` menu select `HTTP` and click `+`. That will
   create an HTTP tab (and switch to it automatically).
3. Set the `port` (I used `8082`) and the `path` (`/webcam`). You can
   set them to whatever you want. You'll need to use them to access the
   video stream. Click Next.
4. In the 'Profile' menu select the format you would like to stream. I
   used `Video - Theora + Vorbis (OGG)`. Click Next.
5. The final step shows you the options you have selected. You can use
   this string on the command line. Click Stream to start the stream.

Create a simple html page and include the following video tag:

	<video
		id="video"
		src="http://localhost:8082/webcam"
		type="video/ogg; codecs=theora"
		autoplay="autoplay"
	/>

The general format is:

	<video
		src="protocol://ipaddress:port/path"
		type="mime-type; codecs=list-of-codeca"
		autoplay="autoplay"
	/>

Start a webserver and load that page. You should see a very laggy
(roughly 5-10 second delay) stream of your webcam.

If you don't want to bother creating the webpage just use `webcam.html`
from this directory. Start a webserver with (or use your favorite
webserver):

	python -m SimpleHTTPServer

The important thing to note is that the web server (in this case
python) is NOT serving the video. The web server is serving a page that
tells the browser to request the video stream from VLC. VLC is handling
the video.

## Streaming the Webcam from the Command Line

`cvlc` is the command line version of vlc. We can use `cvlc` to easily
start streaming the webcam. To stream it, run:

	cvlc --sout='#transcode{vcodec=theo,vb=800,acodec=vorb,ab=128,channels=2,samplerate=44100}:http{mux=ogg,dst=:8082/webcam}' --sout-keep v4l2:///dev/video0 :v4l2-standard= :live-caching=300

Press `ctrl+c` to stop it. That does the exact same thing as the
graphical setup. You can even find all of the arguments in the interface
and replace them in the command.

## Streaming your Desktop

You can also stream your desktop:

	cvlc --sout='#transcode{vcodec=theo,vb=800,acodec=vorb,ab=128,channels=2,samplerate=44100}:http{mux=ogg,dst=:8082/desktop}' --sout-keep screen:// :screen-fps=30 :screen-caching=300

The part that handles capturing the screen is:

	screen:// :screen-fps=30 :screen-caching=300

I changed the path the `/desktop` so that I know on the webpage I'm
expecting to see a stream of my desktop.

## Resizing the Stream

You could resize the video in the browser but I think it's better to
resize it on the server and save some bandwidth. You can add some
options to the `transcode` option to resize the video:

	cvlc --sout='#transcode{width=320,height=240,vcodec=theo,vb=800,acodec=vorb,ab=128,channels=2,samplerate=44100}:http{mux=ogg,dst=:8082/webcam}' --sout-keep v4l2:///dev/video0 :v4l2-standard= :live-caching=300

In this case I set the `width` to `320` and the `height` to `240`.

You can always use the same path for the streams and you could use the
same webpage to view each stream. 

## Additional Resources

http://stackoverflow.com/questions/9866508/how-to-get-stream-from-camera-to-web-page

http://mzimmerm.blogspot.com/2010/04/streaming-webcam-over-internet-on-linux.html

http://xmodulo.com/live-stream-video-webcam-linux.html

http://www.wikihow.com/Stream-Your-Webcam

http://stackoverflow.com/questions/7917905/how-to-use-vlc-live-streams-with-html5-video

https://wiki.videolan.org/Streaming/

http://www.videolan.org/doc/vlc-user-guide/en/ch04.html
