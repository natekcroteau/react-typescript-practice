import React, { ReactNode, ReactElement } from 'react';
import { useState, Component } from 'react';
import './App.css';



// Conventional Props declaring the argument and then the type for the argument
function Heading({title}: { title: string }){
  return(
    <h1>{title}</h1>
  );
}



// Children type ReactNode allows you to use react element type, with ReactElement as the return type 
function HeadingWithContent({children}: { children: ReactNode }): ReactElement {
  return(
    <h1>{children}</h1>
  );
}



// Default Container Props Declared
const defaultContainerProps = {
  heading: <strong>Three</strong>
};
// Defining the container props type using both methods
type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;
// Passing the type to the functional component
function Container({ heading, children }: ContainerProps): ReactElement {
  return(
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}
Container.defaultProps = defaultContainerProps;



// Functional Properties
  //The children prop type is a function that accepts a number
function TextWithNumber({
  children, 
  header
}: {
  children: (num: number) => ReactNode,
  header?: (num: number) => ReactNode //header is optional typing, due to ?
}) {
  //the default state type is set for number
  const [state, setState] = useState<number>(1);

  //onClick has an anonymous function that increments the state count
  //optional header uses ?. for if no header prop is passed to <TextWithNumber> below
  return(
    <div>
      <h2>{header?.(state)}</h2>
      <div>
        <button onClick={() => setState(state + 1)}> 
          Add One To State
        </button>
      </div>
      <div>
        {children(state)}
      </div>
    </div>
  );
}



// List with generic typing
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[],
  render: (item: ListItem) => ReactNode
}) {
  return(
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}



// Class Component with Static Typing
class MyHeader extends Component<{ title: ReactNode }>{
  render() {
    return <h1>{this.props.title}</h1>;
  }
}



//The TextWithNumber component's children is an anonymous function that is the result of {children(state)} above
function App() {
  return (
    <div>
      <Heading title="One"></Heading>
      <HeadingWithContent>
        <strong>Two</strong>
      </HeadingWithContent>
      <Container>Four</Container>
      <TextWithNumber header={(num: number) => <span>State Count = {num}</span>}>
        {(num: number) => <div>State Number = {num}</div>}
      </TextWithNumber>
      <List items={["a", "b", "c", "d", "e"]} render={(item: string) => <div>{item.toUpperCase()}</div>}></List>
      <MyHeader title="My Class Based Header Title"></MyHeader>
    </div>
  );
}

export default App;
