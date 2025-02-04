const Body = ({ text }: {text: string | undefined}) => {
  return (
    <div className="prose" dangerouslySetInnerHTML={{__html: text || ""}} />
  );
};

export default Body;