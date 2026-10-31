export default function Handoff() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg text-text font-body">
      <div className="absolute right-0 top-0 h-full w-[34vw] bg-[#292038]" />
      <div className="relative h-full px-[6vw] py-[8vh]">
        <h1 className="max-w-[76vw] text-[5.2vw] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
          Owner agreement comes before assignment
        </h1>
        <div className="mt-[6vh] flex items-center gap-[1.4vw]">
          <div className="grid h-[8vh] w-[8vh] place-items-center rounded-full bg-primary"><span className="h-[2vh] w-[2vh] rounded-full bg-[#17141e]/50" /></div>
          <div className="h-[0.35vh] w-[9vw] bg-accent" />
          <div className="grid h-[8vh] w-[8vh] place-items-center rounded-full border border-white/20 bg-surface"><span className="h-[2vh] w-[2vh] rounded-full bg-white/30" /></div>
          <div className="h-[0.35vh] w-[9vw] bg-accent" />
          <div className="grid h-[8vh] w-[8vh] place-items-center rounded-full border border-white/20 bg-surface"><span className="h-[2vh] w-[2vh] rounded-full bg-accent" /></div>
        </div>
        <div className="mt-[5vh] grid grid-cols-2 gap-x-[6vw] gap-y-[2.3vh] pr-[28vw]">
          <div className="flex gap-[1vw] border-t border-white/10 pt-[1.8vh]">
            <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
            <p className="text-[2vw] leading-[1.25]">Show the source meeting and a short context excerpt</p>
          </div>
          <div className="flex gap-[1vw] border-t border-white/10 pt-[1.8vh]">
            <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
            <p className="text-[2vw] leading-[1.25]">Proposed owner may confirm, edit, decline, or suggest a replacement</p>
          </div>
          <div className="flex gap-[1vw] border-t border-white/10 pt-[1.8vh]">
            <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
            <p className="text-[2vw] leading-[1.25]">A suggested owner is not responsible until accepting</p>
          </div>
          <div className="flex gap-[1vw] border-t border-white/10 pt-[1.8vh]">
            <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
            <p className="text-[2vw] leading-[1.25]">A rejected transfer returns the open commitment to its current owner</p>
          </div>
          <div className="col-span-2 flex gap-[1vw] border-t border-white/10 pt-[1.8vh]">
            <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-accent" />
            <p className="text-[2vw] leading-[1.25]">Declining a candidate stops simulated follow-up</p>
          </div>
        </div>
      </div>
    </div>
  );
}
