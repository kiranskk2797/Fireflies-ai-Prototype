export default function Problem() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg text-text font-body">
      <div className="absolute right-0 top-0 h-full w-[22vw] bg-surface" />
      <div className="absolute right-[8vw] top-[23vh] h-[52vh] w-[0.8vw] bg-primary" />
      <div className="relative h-full px-[6vw] py-[8vh]">
        <h1 className="max-w-[83vw] text-[5.2vw] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
          An extracted action is not yet an agreed commitment
        </h1>
        <div className="mt-[9vh] grid grid-cols-2 gap-x-[7vw] gap-y-[5vh] pr-[22vw]">
          <div className="flex gap-[1.4vw] border-t border-white/10 pt-[2.4vh]">
            <span className="mt-[1.2vw] h-[0.7vw] w-[0.7vw] shrink-0 rounded-full bg-primary" />
            <p className="text-[2.2vw] leading-[1.3] text-text">A meeting phrase can be mistaken for accepted work</p>
          </div>
          <div className="flex gap-[1.4vw] border-t border-white/10 pt-[2.4vh]">
            <span className="mt-[1.2vw] h-[0.7vw] w-[0.7vw] shrink-0 rounded-full bg-accent" />
            <p className="text-[2.2vw] leading-[1.3] text-text">Ownership may be implicit or disputed</p>
          </div>
          <div className="flex gap-[1.4vw] border-t border-white/10 pt-[2.4vh]">
            <span className="mt-[1.2vw] h-[0.7vw] w-[0.7vw] shrink-0 rounded-full bg-accent/70" />
            <p className="text-[2.2vw] leading-[1.3] text-text">Silence or a checked box cannot say Done, transferred, or no longer needed</p>
          </div>
          <div className="flex gap-[1.4vw] border-t border-white/10 pt-[2.4vh]">
            <span className="mt-[1.2vw] h-[0.7vw] w-[0.7vw] shrink-0 rounded-full bg-white/50" />
            <p className="text-[2.2vw] leading-[1.3] text-muted">Working diagnosis; prevalence and outcome impact remain unvalidated</p>
          </div>
        </div>
      </div>
    </div>
  );
}
