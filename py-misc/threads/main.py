import subprocess
import threading
import time

class Command():
	""" Accepts the exact same parameters as `subprocess.Popen()` """

	def __init__(self, *args, **kwargs):
		self.args = args
		self.kwargs = kwargs
		self.process = None

	def _target(self):
		self.process = subprocess.Popen(*self.args,**self.kwargs)
		self.process.wait()

	def run(self, timeout, error=None, on_done=None):
		"""
		Returns the child process.

		Creates a function to be run in a separate thread, starts the
		thread, and waits `timeout` seconds for it to finish. If the
		subprocess has not finished after `timeout` seconds then it is
		terminated.
		"""

		thread = threading.Thread(target=self._target)
		thread.start()

		thread.join(timeout)
		if callable( on_done ):
			on_done()
		if thread.is_alive():
			self.process.terminate()
			thread.join()
			if error != None:
				raise error

		#return self.process.returncode
		return self.process

cmd = Command( ['sleep','20'] )
cmd.run( 10 )
print 'xyz'
time.sleep( 10 )
