from kivy.app import App
from kivy.uix.label import Label

class ConfigApp( App ):

	def build_config( self, config ):
		config.setdefaults( 'size', dict(
			width = 320,
			height = 240
		) )
		config.setdefaults( 'user', dict(
			first_name = 'John',
			last_name = 'Smith'
		) )

	def build(self):
		config = self.config
		return Label(
			text = '''
				size.width = %s
				size.height = %s
				user.first_name = %s
				user.last_name = %s
			'''.replace('\t\t\t\t','') % (
				self.config.getint('size','width'),
				self.config.getint('size','height'),
				self.config.get('user','first_name'),
				self.config.get('user','last_name')
			)
		)

if __name__ == '__main__':
	ConfigApp().run()
