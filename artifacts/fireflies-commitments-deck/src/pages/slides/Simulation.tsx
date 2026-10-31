export default function Simulation() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg text-text font-body">
      <div className="absolute bottom-0 right-0 h-[36vh] w-[50vw] bg-surface" />
      <div className="relative h-full px-[6vw] py-[8vh]">
        <h1 className="max-w-[82vw] text-[5.2vw] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
          The prototype demonstrates the flow—not an integration
        </h1>
        <div className="mt-[8vh] grid grid-cols-2 gap-x-[7vw] gap-y-[4.5vh]">
          <div className="flex gap-[1.2vw] border-t border-white/10 pt-[2vh]">
            <span className="mt-[1.1vw] h-[0.7vw] w-[0.7vw] shrink-0 rounded-full bg-primary" />
            <p className="text-[2.2vw] leading-[1.28]">Meeting examples and people are synthetic</p>
          </div>
          <div className="flex gap-[1.2vw] border-t border-white/10 pt-[2vh]">
            <span className="mt-[1.1vw] h-[0.7vw] w-[0.7vw] shrink-0 rounded-full bg-primary" />
            <p className="text-[2.2vw] leading-[1.28]">Changes persist only in this browser's local storage</p>
          </div>
          <div className="flex gap-[1.2vw] border-t border-white/10 pt-[2vh]">
            <span className="mt-[1.1vw] h-[0.7vw] w-[0.7vw] shrink-0 rounded-full bg-accent" />
            <p className="text-[2.2vw] leading-[1.28]">Replacement acceptance and status-aware follow-up are simulated</p>
          </div>
          <div className="flex gap-[1.2vw] border-t border-white/10 pt-[2vh]">
            <span className="mt-[1.1vw] h-[0.7vw] w-[0.7vw] shrink-0 rounded-full bg-white/50" />
            <p className="text-[2.2vw] leading-[1.28]">No Fireflies authentication, live transcript, backend, sync, or notification delivery</p>
          </div>
          <div className="col-span-2 flex gap-[1.2vw] border-t border-white/10 pt-[2vh]">
            <span className="mt-[1.1vw] h-[0.7vw] w-[0.7vw] shrink-0 rounded-full bg-white/50" />
            <p className="text-[2.2vw] leading-[1.28]">No usability or experimental evidence of impact</p>
          </div>
        </div>
      </div>
    </div>
  );
}
