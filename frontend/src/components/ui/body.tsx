import { motion as m } from "motion/react";

const Body = ({ text }: {text: string | undefined}) => {
  return (
    <m.div
      initial='hidden'
      whileInView="visible"
      viewport={{once: false}}
      transition={{duration: 1}}
      variants={{
        visible: {opacity: 1},
        hidden: {opacity: 0},
      }}
      className="prose" dangerouslySetInnerHTML={{__html: text || ""}} />
  );
};

export default Body;