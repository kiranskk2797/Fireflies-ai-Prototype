export default function Metrics() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg text-text font-body">
      <div className="absolute right-0 top-0 h-full w-[37vw] bg-[#292038]" />
      <div className="relative h-full px-[6vw] py-[8vh]">
        <h1 className="max-w-[78vw] text-[5.2vw] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
          Measure explicit closure, not clicks
        </h1>
        <div className="mt-[6vh] grid grid-cols-12 gap-[3vw]">
          <div className="col-span-7 flex flex-col gap-[2.1vh]">
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.25]">North Star: <span className="text-[5.5vw] font-semibold leading-none text-accent">14-day</span> commitment resolution rate</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.25]">Clock starts when a proposed owner accepts the candidate</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.25]">Count Done, Deliberately dropped, and Reassigned only after recipient acceptance</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.25]">Exclude unconfirmed candidates, declines, Blocked, and pending transfers</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-accent" />
              <p className="text-[2vw] leading-[1.25]">28% baseline and 45% six-month target are case-study premises, not observed results</p>
            </div>
          </div>
          <div className="col-span-5 flex flex-col justify-center bg-[#292038] px-[2vw] py-[4vh]">
            <p className="text-[2.3vw] leading-[1.3]"><span className="text-[6vw] font-semibold leading-none">28%</span> baseline and <span className="text-[6vw] font-semibold leading-none text-accent">45%</span> six-month target are case-study premises, not observed results</p>
          </div>
        </div>
      </div>
    </div>
  );
}
