import subprocess
import threading

class Command():
	""" Accepts the exact same parameters as `subprocess.Popen()` """

	def __init__(self, *args, **kwargs):
		self.args = args
		self.kwargs = kwargs
		self.process = None

	
	def run(self, timeout):
		"""
		Returns the child process.

		Creates a function to be run in a separate thread, starts the
		thread, and waits `timeout` seconds for it to finish. If the
		subprocess has not finished after `timeout` seconds then it is
		terminated.
		"""
		def target():
			print 'Thread started'
			self.process = subprocess.Popen(*self.args,**self.kwargs)
			self.process.wait()
			print 'Thread finished'

		thread = threading.Thread(target=target)
		thread.start()

		thread.join(timeout)
		if thread.is_alive():
			print 'Terminating process'
			self.process.terminate()
			thread.join()

		#return self.process.returncode
		return self.process

command = Command(
	"echo 'Process started'; sleep 2; echo 'Process finished'",
	shell=True,
	stdout=subprocess.PIPE,
	stderr=subprocess.PIPE
)
print command.run(timeout=3).communicate()
print command.run(timeout=1).communicate()
