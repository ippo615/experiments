
import json
import pathlib

class SimpleConfig:

    _config_dir = './configs/'
    _config_file = 'config'
    _autoload = True

    def __init__(self):
        if self._autoload:
            self._silent_autoload()

    def get_path(self):
        config_dir = pathlib.Path(self._config_dir)
        config_dir.mkdir(parents=True, exist_ok=True)
        return config_dir / pathlib.Path(self._config_file)

    def _silent_autoload(self):
        try:
            return self.load()
        except Exception:
            pass
        return self

    def load(self):
        with open(self.get_path().as_posix(), 'r') as f:
            data = json.loads(f.read())
        return self.from_dict(data)

    def save(self):
        with open(self.get_path().as_posix(), 'w') as f:
            f.write(json.dumps(self.to_dict(), indent=2))

    def list_class_properties(self):
        public_members = filter(lambda x: not x.startswith('_'), dir(self.__class__))
        properties = filter(lambda x: not callable(getattr(self,x)), public_members)
        return list(properties)

    def to_dict(self):
        property_names = self.list_class_properties()
        result = {}
        for name in property_names:
            result[name] = getattr(self, name)
        return result

    def from_dict(self, data):
        properties = self.list_class_properties()
        for key in data:
            if key in properties:
                setattr(self, key, data[key])
        return self


class BallConfig(SimpleConfig):
    _config_file = 'ball_config.json'
    radius = 10
    color = 'red'
    material = 'rubber'

class BasketBallConfig(BallConfig):
    # inherits things from parent
    color = 'orange'

class BaseBallConfig(BallConfig):
    _config_file = 'base_ball_config.json'
    radius = 3
    color = 'white'
    material = 'leather'

if __name__ == '__main__':
    ball = BaseBallConfig()
    # ball = BasketBallConfig()
    # ball.save()
    print(ball.to_dict())

