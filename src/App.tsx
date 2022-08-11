import React from "react";
import "./App.css";

// Convetional props

function Heading({ title }: { title?: string }) {
  return <h1>{title}</h1>;
}

function HeadingWithContent({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <h1>{children}</h1>;
}

// defaultProps
const defaultContainerProps = {
  heading: <strong>My Heading</strong>,
};

type ContainerProps = {
  children: React.ReactNode;
} & typeof defaultContainerProps;

function Container({ heading, children }: ContainerProps): React.ReactElement {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}

Container.defaultProps = defaultContainerProps;

// Functional props
function TextWithNumber({
  header,
  children,
}: {
  header?: (num: number) => React.ReactNode;
  children: (num: number) => React.ReactNode;
}) {
  const [state, stateSet] = React.useState<number>(1);

  return (
    <div>
      {header && <h3>{header?.(state)}</h3>}
      <div>{children(state)}</div>
      <div>
        <button onClick={() => stateSet(state + 1)}>Add</button>
      </div>
    </div>
  );
}

// List
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>{render(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div>
      <Heading title="Hello there" />
      <HeadingWithContent>
        <strong>Hoaas</strong>
      </HeadingWithContent>
      <Container>Foo</Container>
      <TextWithNumber header={(num: number) => <span>Header {num}</span>}>
        {(num: number) => <div>Today's number is {num}</div>}
      </TextWithNumber>
      <List
        items={["oscar", "Dulce", "dona"]}
        render={(item: string) => <div>{item.toUpperCase()}</div>}
      />
    </div>
  );
}

export default App;
