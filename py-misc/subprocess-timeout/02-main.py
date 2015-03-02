import subprocess
import threading

class Command():

	def __init__(self, *args, **kwargs):
		self.args = args
		self.kwargs = kwargs
		self.process = None

	
	def run(self, timeout):

		def target():
			self.process = subprocess.Popen(*self.args,**self.kwargs)
			self.process.wait()

		thread = threading.Thread(target=target)
		thread.start()

		thread.join(timeout)
		if thread.is_alive():
			self.process.terminate()
			thread.join()

		#return self.process.returncode
		return self.process

# Read stderr and stdout, use shell
command = Command(
	"echo 'Process started'; sleep 2; echo 'Process finished'",
	shell=True,
	stdout=subprocess.PIPE,
	stderr=subprocess.PIPE
)
print command.run(timeout=3).communicate()
print command.run(timeout=1).communicate()

# Get return code
command = Command(
	"echo 'Process started'; sleep 2; echo 'Process finished'",
	shell=True,
	stdout=subprocess.PIPE,
	stderr=subprocess.PIPE
)
print command.run(timeout=3).returncode
print command.run(timeout=1).returncode
