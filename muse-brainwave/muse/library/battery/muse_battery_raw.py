
class MuseBatteryRaw( object ):

	def __init__( self, chargePercent, voltageFuelGauge, voltageAdc, temperature ):
		self.chargePercent = float(chargePercent)/100.0
		self.voltageFuelGauge = voltageFuelGauge
		self.voltageAdc = voltageAdc
		self.temperature = temperature

	def __str__( self ):
		return "Raw Battery Data: %4.2f%% (%d or %d mV) %d C" % (
			self.chargePercent,
			self.voltageFuelGauge,
			self.voltageAdc,
			self.temperature
		)

