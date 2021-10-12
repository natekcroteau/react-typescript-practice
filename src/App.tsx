import React, { ReactNode, ReactElement } from 'react';
import './App.css';


// Conventional Props declaring the argument and then the type for the argument
function Heading({title}: { title: string;}){
  return(
    <h1>{title}</h1>
  )
}

// Children type ReactNode allows you to use react element type, with ReactElement as the return type 
function HeadingWithContent({children}: { children: ReactNode;}): ReactElement {
  return(
    <h1>{children}</h1>
  )
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

function App() {
  return (
    <div>
      <Heading title="One"></Heading>
      <HeadingWithContent>
        <strong>Two</strong>
      </HeadingWithContent>
      <Container>Four</Container>
      
    </div>
  );
}

export default App;
