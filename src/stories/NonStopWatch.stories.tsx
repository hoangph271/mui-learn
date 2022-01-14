import { ComponentStory, ComponentMeta } from '@storybook/react'
import { NonStopWatch } from '../components/NonStopWatch'

export default {
  title: 'Example/NonStopWatch',
  component: NonStopWatch,
  argTypes: {
    startAt: { control: 'date' }
  }
} as ComponentMeta<typeof NonStopWatch>

const Template: ComponentStory<typeof NonStopWatch> = (args) => <NonStopWatch {...args} />

export const Default = Template.bind({})
Default.args = {
  startAt: new Date('2021-08-11T21:19:04.811Z').getTime(),
  size: '4rem'
}
