function CandidateReport() {
  return (
    <div className="bg-ltblue text-white w-full h-full rounded-md overflow-hidden">
      <h2 className="w-full text-start text-xl p-5 pb-2 pt-3">
        Candidates Data
      </h2>
      <div className="text-base space-y-1 mx-3 overflow-y-scroll max-h-[70%] pb-2 text-start">
        <div className="bg-mdblue rounded-md pl-7">
          <h2>Total Candidates: 120</h2>
        </div>
        <div className="bg-mdblue rounded-md pl-7">
          <h2>Candidates Passed: 80</h2>
        </div>
        <div className="bg-mdblue rounded-md pl-7">
          <h2>Candidates Failed: 40</h2>
        </div>
        <div className="bg-mdblue rounded-md pl-7">
          <h2>Candidates cheated: 20</h2>
        </div>
        <div className="bg-mdblue rounded-md pl-7">
          <h2>Candidates Failed: 40</h2>
        </div>
        <div className="bg-mdblue rounded-md pl-7">
          <h2>Candidates cheated: 20</h2>
        </div>
      </div>
    </div>
  );
}

export default CandidateReport;
