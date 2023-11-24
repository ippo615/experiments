
# pip install pytube
from pytube import YouTube

# Simple way:
# YouTube('https://youtu.be/9bZkp7q19f0').streams.first().download()


# pip install tqdm
import sys
def on_progress(stream, chunk, bytes_remaining):
    text = "\rBytes Remaing %d" % bytes_remaining
    sys.stdout.write(text.ljust(50, ' '))
    sys.stdout.flush()
    # print('%d bytes remaining' % bytes_remaining)

# Flexible way to get best quality
videos = """https://www.youtube.com/watch?v=BLAHBLAHBLAH""".split('\n')
failures = []
for index, video in enumerate(videos):
    print('Downloading [%d of %d]: %s' % (index, len(videos), video))
    try:
        yt = YouTube(
            video,
            on_progress_callback=on_progress,
        )
        yt.streams \
            .filter(progressive=True, file_extension='mp4') \
            .order_by('resolution') \
            .desc() \
            .first() \
            .download()
    except:
        failures.append(video)
        print('Failed to download [%d of %d]: %s' % (index, len(videos), video))
print('Failed to download:\n%s' % '\n'.join(failures))


