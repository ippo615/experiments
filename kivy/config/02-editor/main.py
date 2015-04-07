from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.button import Button

# For more information:
# http://kivy.org/docs/api-kivy.uix.settings.html

jsonData = '''[
    { "type": "title",
      "title": "Settings Application" },

    { "type": "string",
      "title": "First Name",
      "desc": "The user's name",
      "section": "user",
      "key": "first_name" },

    { "type": "string",
      "title": "Last Name",
      "desc": "The user's family name or surname",
      "section": "user",
      "key": "last_name" },

    { "type": "numeric",
      "title": "Width",
      "desc": "The desired horizontal resolution",
      "section": "size",
      "key": "width" },

    { "type": "numeric",
      "title": "Height",
      "desc": "The desired vertical resolution",
      "section": "size",
      "key": "height" }
]'''

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
		settingsButton = Button(
			text = 'Adjust Settings'
		)
		settingsButton.bind( on_press = self.open_settings )
		return settingsButton
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

	def build_settings(self, settings):
		settings.add_json_panel(
			'Test application',
			self.config,
			data=jsonData
		)

if __name__ == '__main__':
	app = ConfigApp()
	app.run()
