import { windowDimensions } from "../../store";
import { observer } from "mobx-react";

export const LessonPage = observer(() => {
  const { width, height } = windowDimensions
  console.log(width, height);

  return (
    <>
      <h1>LESSON</h1>
    </>
  );
});