export default function Validation() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg text-text font-body">
      <div className="absolute inset-y-0 left-0 w-[1.2vw] bg-primary" />
      <div className="relative h-full px-[7vw] py-[8vh]">
        <h1 className="max-w-[80vw] text-[5.2vw] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
          Test owner trust before claiming lift
        </h1>
        <div className="mt-[7vh] grid grid-cols-2 gap-x-[7vw] gap-y-[4vh]">
          <div className="border-t border-primary pt-[2vh]">
            <p className="text-[2.2vw] leading-[1.3]">Run task-based sessions with commitment makers, proposed owners, and replacement owners</p>
          </div>
          <div className="border-t border-white/15 pt-[2vh]">
            <p className="text-[2.2vw] leading-[1.3]">Observe context comprehension, edit/decline confidence, transfer trust, and reminder relevance</p>
          </div>
          <div className="border-t border-white/15 pt-[2vh]">
            <p className="text-[2.2vw] leading-[1.3]">Resolve cohort rules: transfers, reopens, duplicates, timestamps, and day-14 boundary</p>
          </div>
          <div className="border-t border-white/15 pt-[2vh]">
            <p className="text-[2.2vw] leading-[1.3]">Review user-agency and reminder-fatigue guardrails</p>
          </div>
          <div className="col-span-2 border-t border-white/15 pt-[2vh]">
            <p className="max-w-[79vw] text-[2.2vw] leading-[1.3] text-accent">Validate in a measured pilot before comparing outcomes to the case-study target</p>
          </div>
        </div>
      </div>
    </div>
  );
}
