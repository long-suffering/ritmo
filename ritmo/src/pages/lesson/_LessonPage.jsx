import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

import { lessonList } from "../../constants";
import { Player } from "./fragments";
import { windowDimensions } from "../../store";

export const LessonPage = observer(() => {
  const { id: lessonId } = useParams();

  const { width, height } = windowDimensions;

  return (
    <Player
      {...lessonList[lessonId]}
      windowHeight={height}
      windowWidth={width}
      lessonId={lessonId}
    />
  );
});