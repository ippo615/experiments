
import traitlets


class FrameConfig(traitlets.HasTraits):
    max_x = traitlets.Float(0.2)
    max_y = traitlets.Float(0.2)
    max_z = traitlets.Float(0.0)
    min_x = traitlets.Float(0.0)
    min_y = traitlets.Float(0.0)
    min_z = traitlets.Float(-0.1)


class PnpConfig(traitlets.HasTraits):
    pickup_x = traitlets.Float()

    @traitlets.validate('pickup_x')
    def _valid_pickup_x(self, proposal):
        # The following operating have not been impleted by traitlets:
        # if proposal.trait > FrameConfig.max_x (traitlet.Float > traitlet.Float)
        # if proposal.value > FrameConfig.max_x (builtins.float > traitlet.Float)
        # The following is allowed but why would I validate against the
        # default value!? I should validate against the current value:
        # proposal.value > FrameConfig.max_x.default_value
        print(proposal.value)
        print(proposal.trait)
        if proposal.value > FrameConfig.max_x.default_value:
            raise traitlets.TraitError('%s (%f) must be less than %s (%f)' % (
                'pickup_x',
                proposal.value,
                'FrameConfig.max_x',
                FrameConfig.max_x
            ))
        if proposal.value < FrameConfig.min_x.default_value:
            raise traitlets.TraitError('%s (%f) must be greater than %s (%f)' % (
                'pickup_x',
                proposal.value,
                'FrameConfig.min_x',
                FrameConfig.min_x
            ))
        return proposal['pickup_x']


if __name__ == '__main__':
    pnp = PnpConfig()
    pnp.pickup_x = 0.5
    print(pnp)


# https://realpython.com/python-descriptors/#how-to-use-python-descriptors-properly
# is probably very useful
