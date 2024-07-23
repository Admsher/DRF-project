import { React } from "react";
import Topsection from "./topsection/topsection";
import Candidatelist from "./candidatelist/candidatelist";

function Home({ files, setFiles, setGeneratedQuestions, generatedQuestions }) {
  return (
    <div className="h-[90%]  w-full">
      <Topsection
        files={files}
        setFiles={setFiles}
        setGeneratedQuestions={setGeneratedQuestions}
        generatedQuestions={generatedQuestions}
      />
      <Candidatelist files={files} setFiles={setFiles} />
    </div>
  );
}

export default Home;
