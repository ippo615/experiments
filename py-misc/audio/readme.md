Install pyaudio by following the instructions at:

	http://people.csail.mit.edu/hubert/pyaudio/

Additional reading:

	http://stackoverflow.com/questions/4160175/detect-tap-with-pyaudio-from-live-mic/4160733#4160733

That and the sample gave the following error:

	ALSA lib pcm_dmix.c:1022:(snd_pcm_dmix_open) unable to open slave
	ALSA lib pcm.c:2239:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.rear
	ALSA lib pcm.c:2239:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.center_lfe
	ALSA lib pcm.c:2239:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.side
	bt_audio_service_open: connect() failed: Connection refused (111)
	bt_audio_service_open: connect() failed: Connection refused (111)
	bt_audio_service_open: connect() failed: Connection refused (111)
	bt_audio_service_open: connect() failed: Connection refused (111)
	ALSA lib pcm_dmix.c:1022:(snd_pcm_dmix_open) unable to open slave
	Cannot connect to server socket err = No such file or directory
	Cannot connect to server request channel
	jack server is not running or cannot be started

Attempt to fix:

	sudo apt-get install multimedia-jack
	pulseaudio --kill
	jack_control  start

That reduces the error messages to:

	ALSA lib pcm_dmix.c:1022:(snd_pcm_dmix_open) unable to open slave
	ALSA lib pcm.c:2239:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.rear
	ALSA lib pcm.c:2239:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.center_lfe
	ALSA lib pcm.c:2239:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.side
	bt_audio_service_open: connect() failed: Connection refused (111)
	bt_audio_service_open: connect() failed: Connection refused (111)
	bt_audio_service_open: connect() failed: Connection refused (111)
	bt_audio_service_open: connect() failed: Connection refused (111)
	ALSA lib pcm_dmix.c:1022:(snd_pcm_dmix_open) unable to open slave
	Cannot lock down 82274202 byte memory area (Cannot allocate memory)

And I can make a recording.

