export default function Resolution() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg text-text font-body">
      <div className="absolute bottom-0 left-0 h-[33vh] w-full bg-surface" />
      <div className="relative h-full px-[6vw] py-[8vh]">
        <h1 className="max-w-[83vw] text-[5.2vw] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
          Each commitment has an honest outcome
        </h1>
        <div className="mt-[7vh] grid grid-cols-12 gap-x-[3vw] gap-y-[3.4vh]">
          <p className="col-span-6 border-t border-primary pt-[1.8vh] text-[2.3vw] leading-[1.28]"><span className="font-semibold text-accent">Open:</span> accepted and not yet resolved</p>
          <p className="col-span-6 border-t border-white/20 pt-[1.8vh] text-[2.3vw] leading-[1.28]"><span className="font-semibold">Blocked:</span> unresolved; return to Open when unblocked</p>
          <p className="col-span-6 border-t border-white/20 pt-[1.8vh] text-[2.3vw] leading-[1.28]"><span className="font-semibold">Done:</span> completed; <span className="font-semibold text-accent">Deliberately dropped:</span> no longer needed</p>
          <p className="col-span-6 border-t border-white/20 pt-[1.8vh] text-[2.3vw] leading-[1.28]"><span className="font-semibold text-accent">Reassigned:</span> closes the former owner's instance after recipient acceptance</p>
          <p className="col-span-12 border-t border-white/20 pt-[1.8vh] text-[2.3vw] leading-[1.28] text-muted">Recipient acceptance creates a linked Open instance for the new owner</p>
        </div>
      </div>
    </div>
  );
}
