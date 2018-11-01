# A Simple Higher Order Component to Add Polling Functionality

## Run

`npm install`

`npm start`

## Structure

The application structure is as follows:

/src
- App

  /components
  - Posts
  - Post
  - WithPolling

  /services
  - PostsService

## Technical Summary

- The Wizard component has three sub components: Steps, Content and Actions
- It takes a single property steps:

```
interface IWizardProps {
  steps: IStep[];
}
```

- Steps are made up of "content" and "title":

```
interface IStep {
  content: JSX.Element;
  title: string;
}
```

- Using this property, the Wizard component defines it's state:

```
interface IStepProps extends IStep {
  isSelected: boolean;
  id: string;
  index: number;
}
```

- IStepProps are passed through to Steps, and passed individual to Step components which are rendered in Steps
- The "content" property of the currently selected step is rendered in Content
- A reference to the currently selected step (IStepProps), and all steps (IStepProps[]), are passed into Actions; along with a callback for selecting a step:

```
interface IActionsProps {
  currentStep: IStepProps;
  onSelectStep: (step: IStepProps) => void;
  steps: IStepProps[];
}
```

- Using buttons labeled Previous and Next, Actions will select a given step, setting it's property isSelected to true, and all other step's isSelected properties to false. This triggers a rerendering of steps and Content, rendering the newly selected step's content.

## Design Considerations

- While the component architecture seems complex given the extent of the functionality implemented, I wanted to structure the component so that extending functionality would be easy.
- Wrapping each Step in a pass through component Steps allows for a seperation of CSS styles, and makes it easier for the developer to expand upon Step related functionality. For example, say there was a need for a vertical layout for steps -- this becomes relatively trivial to implement given the parent wrapper, and the logic related to a vertical layout could live in Steps
- An arguably simpler approach would be to track the currently selected index, rather then initializing steps as it's own state based collection within wizard. However, as more substantial functionality is added, tracking steps in different states becomes cumbersome:
  - A step is disabled until a user completes previous steps
  - A step is enabled but incomplete and a different icon needs to be rendered (a number vs. a completed check mark)
  - A step is hovered and a tooltip that explains the title needs to be shown
- Considering possible (and likely) extensions to the initial functionality, it makes sense to consolidate step state management in the properties of the step itself

## Possible Functionality Improvements

- Preserve step selection in local storage so that the selected step is preserved upon navigation
- Add isEnabled, isComplete flags and callbacks for steps
- Allow a user to click on enabled steps, instead of just using the action buttons for navigation
- Add confirm modal for navigating away from a step that is incomplete

\*Note: This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
